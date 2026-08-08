// prisma/seed.js
//
// Copies the sample asanas from data/asanas.js into PostgreSQL.
// Run it with:  npm run db:seed
//
// Prisma 7 does not load .env by itself, so this line must come first —
// lib/prisma.js reads process.env.DATABASE_URL the moment it is imported.
import "dotenv/config";

import { prisma } from "../lib/prisma.js";
import asanas from "../data/asanas.js";

// Note the ".js" on the imports above. In real ES modules the file extension
// is required — unlike inside Next.js, where the bundler guesses it for you.

async function main() {
  console.log(`Seeding ${asanas.length} asanas into PostgreSQL...\n`);

  for (const asana of asanas) {
    // Pull `id` off and keep the rest. The ids in data/asanas.js were made up
    // by hand; PostgreSQL assigns its own via autoincrement, and forcing our
    // numbers in would leave its counter out of step with the real rows.
    const { id, ...fields } = asana;

    // upsert = update if it already exists, otherwise create it.
    // Matching on `name` (which is @unique) makes this script safe to run
    // as many times as you like — no duplicate rows.
    const saved = await prisma.asana.upsert({
      where: { name: asana.name },
      update: fields,
      create: fields,
    });

    console.log(`  ✓ ${saved.name.padEnd(22)} (id: ${saved.id})`);
  }

  const total = await prisma.asana.count();
  console.log(`\nDone. ${total} asanas now in the database.`);
}

// Top-level: run main(), report any failure, and always close the connection.
// Without $disconnect() the script would hang holding an open connection.
main()
  .catch((error) => {
    console.error("Seeding failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
