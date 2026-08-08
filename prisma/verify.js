// prisma/verify.js
//
// Proves the round trip works: data written by the seed can be read back
// out of PostgreSQL through Prisma.
//
// Run it with:  npm run db:verify

import "dotenv/config";

import { prisma } from "../lib/prisma.js";

async function main() {
  // findMany() with no arguments = "SELECT * FROM Asana".
  // orderBy sorts the results; this is Prisma's version of ORDER BY.
  const all = await prisma.asana.findMany({
    orderBy: { id: "asc" },
  });

  console.log(`Read ${all.length} asanas back from PostgreSQL:\n`);

  for (const asana of all) {
    console.log(`  ${asana.id}. ${asana.name} — ${asana.englishName}`);
    console.log(`     ${asana.level} · ${asana.category}`);
    console.log(`     benefits: ${asana.benefits.join(", ")}\n`);
  }

  // A filtered query, to show searching happens in the database now
  // rather than in JavaScript. `mode: "insensitive"` ignores capitals.
  const beginners = await prisma.asana.findMany({
    where: { level: { equals: "Beginner", mode: "insensitive" } },
    select: { name: true }, // select = fetch only these columns
  });

  console.log(
    `Filtered in SQL — beginner poses: ${beginners.map((a) => a.name).join(", ")}`
  );
}

main()
  .catch((error) => {
    console.error("Verification failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
