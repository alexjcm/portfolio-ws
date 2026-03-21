import { FastifyInstance } from 'fastify';
import * as projectController from '../controllers/projects';
import { createProjectSchema, updateProjectSchema, getProjectSchema } from '../schemas/projects';
import authenticate from '../middlewares/authentication';

export default async function projectRoutes(fastify: FastifyInstance) {
  fastify.get('/projects', projectController.getAllActiveProjects);
  fastify.get('/projects/:id', { schema: getProjectSchema }, projectController.getProjectById);
  fastify.post('/projects', { schema: createProjectSchema, preHandler: authenticate }, projectController.createProject);
  fastify.put('/projects', { schema: updateProjectSchema, preHandler: authenticate }, projectController.updateProject);
}
