import * as Sentry from '@sentry/node';
import dotenv from 'dotenv';

// Ensure to load environment variables before anything else
dotenv.config({ path: process.env.ENV_PATH || '.env' });

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Adds request headers and IP for users, high value for debugging with minimal overhead
  sendDefaultPii: true,

  // Performance monitoring with low overhead (10% of transactions)
  tracesSampleRate: 0.1,
});
