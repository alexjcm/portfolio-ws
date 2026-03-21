import { FastifyRequest, FastifyReply } from 'fastify';
import { Project } from '../database';

export const getAllActiveProjects = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const projects = await Project.findAll({
      attributes: ['id', 'name', 'description', 'projectLink', 'imageProjectLink'],
      where: { status: true },
    });

    return reply.code(200).send(projects);
  } catch (error) {
    request.log.error(error, 'Error in getAllActiveProjects');
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const getProjectById = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): void => {
  const { id: projectId } = request.params;

  Project.findOne({
    where: { id: projectId },
  })
    .then((projt) => {
      return reply.code(200).send(projt);
    })
    .catch((err) => {
      request.log.error(err, 'Error in getProjectById');
      return reply.code(405).send('Error has occured');
    });
};

export const createProject = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const projt = await Project.create(request.body as any);
    return reply.code(200).send(projt);
  } catch (err) {
    request.log.error(err, 'Error creating project:');
    return reply.code(405).send('Error creating project');
  }
};

export const updateProject = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const body = request.body as any;
  const projectId = body.id;
  try {
    const [result] = await Project.update(body, {
      where: { id: projectId },
    });
    if (result === 1) {
      return reply.send({
        message: 'Project was updated successfully.',
      });
    } else {
      return reply.code(400).send({
        message: `Cannot update project with id=${projectId}; project was not found!`,
      });
    }
  } catch (err) {
    request.log.error(err, 'Error updating project:');
    return reply.code(500).send({
      message: `Error updating project with id=${projectId}`,
    });
  }
};
