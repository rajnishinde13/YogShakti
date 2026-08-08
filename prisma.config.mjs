// prisma.config.mjs
//
// Configuration for the Prisma CLI (migrate, generate, db seed).
//
// IMPORTANT (Prisma 7): Prisma no longer reads .env on its own. The
// `import "dotenv/config"` line below is what loads .env into process.env.
// Remove it and DATABASE_URL becomes undefined.

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  // Where the data model lives.
  schema: "prisma/schema.prisma",

  migrations: {
    // Where migration SQL files are written.
    path: "prisma/migrations",

    // The command `npx prisma db seed` runs.
    // In Prisma 7 this lives here — older guides put it in package.json.
    seed: "node prisma/seed.js",
  },

  datasource: {
    // Which database the Prisma CLI talks to (migrate, seed, studio).
    // Read from .env, which is git-ignored and never committed.
    //
    // DIRECT_URL is optional and only matters with hosted PostgreSQL.
    // Providers like Neon and Supabase give you two connection strings:
    //
    //   pooled  -> for the running app. Serverless functions open a new
    //              connection per request, and the pooler keeps the database
    //              from running out of them. This goes in DATABASE_URL.
    //   direct  -> a plain connection with no pooler in between.
    //
    // Migrations MUST use the direct one. `prisma migrate` takes an advisory
    // lock so two deploys cannot migrate at once, and transaction-mode poolers
    // do not support those locks — the migration hangs or fails.
    //
    // Locally there is no pooler, DIRECT_URL is unset, and this falls back
    // to DATABASE_URL. Nothing changes for local development.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  },
});
