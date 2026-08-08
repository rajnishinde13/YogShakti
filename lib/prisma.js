// lib/prisma.js
//
// Creates ONE PrismaClient for the whole project and exports it.
// Anything that needs the database imports `prisma` from here.

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 talks to PostgreSQL through a "driver adapter" — a thin wrapper
// around the standard `pg` Node driver. Older Prisma versions used a bundled
// Rust engine instead, which is why older tutorials never mention this.
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// In development Next.js reloads your code on every save. Without the guard
// below, each reload would build a brand-new PrismaClient and open another
// pool of PostgreSQL connections until the database refused new ones.
// Storing the client on globalThis means we reuse the same one.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
