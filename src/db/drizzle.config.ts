import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: process.env.SQL_HOST!,
    database: process.env.SQL_DB_NAME!,
    user: process.env.SQL_ADMIN_USER!,
    password: process.env.SQL_ADMIN_PASSWORD!,
    ssl: false,
  },
});
