import { FastifyRequest, FastifyReply } from 'fastify';
import { User } from '../database';
import * as tokenHelper from '../helpers/token';

export default async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const authorizationHeader = request.headers.authorization || '';

  // Firstly, set request user to null
  (request as any).user = null;

  if (!authorizationHeader) {
    request.log.warn('Empty Authorization header');
    return; // Fastify continues if no error is thrown/sent
  }

  if (!authorizationHeader.startsWith('Bearer ')) {
    request.log.warn('Make sure the token is bearer token');
    return;
  }

  let decodedToken: any;
  try {
    const token = authorizationHeader.substring(7);
    decodedToken = await tokenHelper.verifyToken(token);
  } catch (error: any) {
    return reply.code(401).send({ message: error });
  }

  try {
    const user = await User.findByPk(decodedToken.id);
    if (!user) {
      return reply.code(401).send({ message: 'There is no user' });
    }

    // Set request user
    (request as any).user = user;
  } catch {
    return reply.code(401).send({ message: 'There is no user' });
  }
}
