import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import db from '../database';

const dbPlugin: FastifyPluginAsync = async (fastify) => {
  try {
    await db.sync();
    fastify.log.info('Connected to database');
    fastify.decorate('db', db);
    fastify.decorate('models', db.models);
  } catch (err) {
    fastify.log.error(err, 'Error connecting to database: ');
    throw err;
  }
};

export default fp(dbPlugin, { name: 'db' });

// Add declaration for TypeScript
declare module 'fastify' {
  interface FastifyInstance {
    db: typeof db;
    models: typeof db.models;
  }
}
