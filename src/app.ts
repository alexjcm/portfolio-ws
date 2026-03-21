// Import this first!
import './config/instrument';

import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import rateLimit from '@fastify/rate-limit';
import * as Sentry from '@sentry/node';
import corsOptions from './config/cors';
import dbPlugin from './plugins/db';
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import mailerRoutes from './routes/mailer';

// Environment already loaded in './config/instrument'

const app = Fastify({
  logger: true,
});

// Sentry Error Handler for Fastify v8+
Sentry.setupFastifyErrorHandler(app);

// Register Plugins
app.register(sensible);
app.register(helmet);
app.register(cors, corsOptions);
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

// Database Integration
app.register(dbPlugin);

// Feature Routes
app.register(authRoutes);
app.register(projectRoutes);
app.register(mailerRoutes);

// Swagger Documentation
app.register(swagger, {
  openapi: {
    info: {
      title: 'Portfolio API',
      description: 'Portfolio Web Service API Documentation',
      version: '2.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5010',
      },
    ],
  },
});

app.register(swaggerUi, {
  routePrefix: '/api-docs',
});

// Global 404 handler
app.setNotFoundHandler((request, reply) => {
  reply.code(404).send({
    message: `Opsss! The url: ${request.url} of type: ${request.method} does not exist`,
  });
});

export default app;
