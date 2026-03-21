import app from './app';

const port = Number(process.env.PORT) || 5010;
const host = '0.0.0.0';

const start = async () => {
  try {
    await app.listen({ port, host });
    // app.log.info(`Server listening on port: ${port}`); // Fastify already logs this if logger: true
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
