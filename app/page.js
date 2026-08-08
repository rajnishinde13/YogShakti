// app/page.js
//
// This is a SERVER COMPONENT. Notice there is no "use client" at the top —
// that is the default in the App Router. The code below runs on the server,
// never in the browser, which is exactly what lets it use Prisma.
//
// The database password lives in .env on the server. If this file ran in the
// browser, that password would be handed to every visitor.

import { prisma } from "@/lib/prisma";

import Hero from "@/components/Hero";
import AsanaSearch from "@/components/AsanaSearch";

// Without this, Next.js would run the query ONCE at build time and serve the
// same frozen HTML forever. "force-dynamic" asks for a fresh query on every
// request, so changes in PostgreSQL show up on the next page refresh.
export const dynamic = "force-dynamic";

// An `async` function returns a promise. `await` pauses inside it until the
// promise settles — here, until PostgreSQL answers.
async function getAsanas() {
  try {
    // findMany() = "SELECT ... FROM Asana". Prisma turns this object into SQL.
    const asanas = await prisma.asana.findMany({
      // ORDER BY id ASC — keeps the cards in the same order as before.
      orderBy: { id: "asc" },

      // select = fetch only these columns. Two reasons to be explicit:
      //   1. We do not need createdAt / updatedAt in the UI.
      //   2. Those two are Date objects, and everything handed to a client
      //      component has to be sent over the network as plain data.
      // The field names below match exactly what AsanaCard reads.
      select: {
        id: true,
        name: true,
        englishName: true,
        level: true,
        category: true,
        emoji: true,
        description: true,
        benefits: true,
      },
    });

    return asanas;
  } catch (error) {
    // Reaching here means the query itself failed — Postgres not running,
    // a bad DATABASE_URL, a missing table. This is different from "the query
    // worked and found nothing", which returns an empty array instead.
    console.error("Could not load asanas from the database:", error);

    // Returning null lets the caller tell a real failure apart from no rows.
    return null;
  }
}

// The component is `async` too, so it can await getAsanas() before rendering.
// Server components are allowed to do this; browser components are not.
export default async function HomePage() {
  const asanas = await getAsanas();

  // CASE 1 — the database could not be reached.
  if (asanas === null) {
    return (
      <main>
        <Hero />
        <section className="mx-auto max-w-xl px-4 py-16 text-center">
          <p className="text-3xl" aria-hidden="true">
            ⚠️
          </p>
          <h2 className="mt-3 text-xl font-semibold text-stone-900">
            Could not reach the database
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            The asanas live in PostgreSQL. Check that it is running, then
            refresh this page.
          </p>
          <code className="mt-4 inline-block rounded-lg bg-stone-100 px-3 py-2 text-xs text-stone-700">
            brew services start postgresql@14
          </code>
        </section>
      </main>
    );
  }

  // CASE 2 — the database answered, but there are no rows yet.
  if (asanas.length === 0) {
    return (
      <main>
        <Hero />
        <section className="mx-auto max-w-xl px-4 py-16 text-center">
          <p className="text-3xl" aria-hidden="true">
            🌱
          </p>
          <h2 className="mt-3 text-xl font-semibold text-stone-900">
            No asanas yet
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            The database is connected but empty. Load the sample poses:
          </p>
          <code className="mt-4 inline-block rounded-lg bg-stone-100 px-3 py-2 text-xs text-stone-700">
            npm run db:seed
          </code>
        </section>
      </main>
    );
  }

  // CASE 3 — the normal path. Hand the rows to the browser component.
  return (
    <main>
      <Hero />
      <AsanaSearch asanas={asanas} />
    </main>
  );
}
