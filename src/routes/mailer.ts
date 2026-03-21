import { FastifyInstance } from 'fastify';
import * as mailerController from '../controllers/mailer';
import { sendMailSchema } from '../schemas/mailer';

export default async function mailerRoutes(fastify: FastifyInstance) {
  fastify.post('/send-email', { schema: sendMailSchema }, mailerController.sendMail);
}
