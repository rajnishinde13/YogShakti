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
    // Read from .env, which is git-ignored and never committed.
    url: process.env.DATABASE_URL,
  },
});
