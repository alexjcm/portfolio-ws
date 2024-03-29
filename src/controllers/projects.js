import db from '../database';
import logger from '../logger/logger';

/**
 * Get all active projects
 */
export const getAllActiveProjects = (req, res, next) => {
  db.models.project
    .findAll({
      attributes: ['id', 'name', 'description', 'projectLink', 'imageProjectLink'],
      where: { status: true },
    })
    .then((projt) => {
      res.status(200).json(projt);
    })
    .catch(function (err) {
      logger.error(err, 'error:');
    });
};

export const getProjectById = (req, res, next) => {
  const { id: projectId } = req.params;

  db.models.project
    .findOne({
      where: { id: projectId },
    })
    .then((projt) => {
      res.status(200).json(projt);
    })
    .catch((err) => {
      logger.error(err, 'err:');
      res.status(405).json('Error has occured');
    });
};

export const createProject = (req, res, next) => {
  db.models.project
    .create(req.body)
    .then((projt) => {
      res.status(200).json(projt);
    })
    .catch((err) => {
      logger.error(err, 'err:');
      res.status(405).json('Error creating project');
    });
};

export const updateProject = (req, res) => {
  db.models.project
    .update(req.body, {
      where: { id: req.body.id },
    })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: 'Project was updated successfully.',
        });
      } else {
        res.status(400).send({
          message: `Cannot update project with id=${req.body.id} was not found!`,
        });
      }
    })
    .catch((err) => {
      logger.error(err, 'err:');
      res.status(500).send({
        message: `Error updating project with id=${req.body.id}`,
      });
    });
};

export const incrementVisit = (req, res) => {
  db.models.visit
    .findOrCreate({
      where: { },
      defaults: { counter: 1 },
    })
    .then(([visit, created]) => {
      if (!created) {
        visit
        .increment('counter')
        .then(() => visit.save());
        res.send({
          message: 'Visit was updated successfully.',
          data: visit
        });
      } else {
        res.send({
          message: 'Visit was created successfully.',
          data: visit
        });
      }
    })
    .catch((error) => {
      logger.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};
