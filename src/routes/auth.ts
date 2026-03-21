import { FastifyInstance } from 'fastify';
import * as authController from '../controllers/auth';
import { loginSchema, registerSchema } from '../schemas/auth';
import authenticate from '../middlewares/authentication';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/login', { schema: loginSchema }, authController.login);
  fastify.post('/register', { schema: registerSchema }, authController.register);
  fastify.get('/me', { preHandler: authenticate }, authController.getCurrentUser);
}
