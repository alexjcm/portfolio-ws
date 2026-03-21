import { FastifyRequest, FastifyReply } from 'fastify';
import { compare } from 'bcryptjs';
import { User } from '../database';
import * as tokenHelper from '../helpers/token';

interface AuthBody {
  email: string;
  password?: string;
}

export const login = async (request: FastifyRequest<{ Body: AuthBody }>, reply: FastifyReply): Promise<void> => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return reply.code(400).send({ message: 'There is no user with this email address!' });
    }
    
    if (!password) {
      return reply.code(400).send({ message: 'Password is required!' });
    }

    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      return reply.code(400).send({ message: 'Incorrect password!' });
    }

    const data = { id: user.id, email: user.email };
    const expiresIn = '1h';
    let token: string;
    try {
      token = tokenHelper.generateToken(data, expiresIn);
      request.log.info('Token generated');
    } catch (err) {
      request.log.error(err, 'Error generating token:');
      return reply.code(500).send({ message: 'Internal server error D' });
    }

    return reply.code(200).send({ token: token });
  } catch (err) {
    return reply.code(500).send({ error: err });
  }
};

export const getCurrentUser = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const user = (request as any).user;
  if (user && user.dataValues) {
    const userData = { ...user.dataValues };
    delete userData.password;
    return reply.send(userData);
  }
  return reply.send(user);
};

export const register = async (request: FastifyRequest<{ Body: AuthBody }>, reply: FastifyReply): Promise<void> => {
  try {
    const user = await User.create(request.body as any);

    const data = { id: user.id, email: user.email };
    const expiresIn = '1h';
    const token = tokenHelper.generateToken(data, expiresIn);
    return reply.code(201).send({ token: token });
  } catch (err) {
    request.log.error(err, 'Error register:');
    throw err;
  }
};
