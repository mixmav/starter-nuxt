import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dialect: 'sqlite', // replace with turso for serverless prod environments
  dbCredentials: {
    url: 'file:./dev.sqlite',
    // url: process.env.TURSO_CONNECTION_URL!,
    // authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
