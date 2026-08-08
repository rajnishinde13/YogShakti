// app/asana/[slug]/page.js
//
// A DYNAMIC ROUTE. The folder name in square brackets is the important part:
//
//   app/asana/[slug]/page.js   ->   /asana/tadasana
//                                   /asana/vrikshasana
//                                   /asana/anything-at-all
//
// One file serves every pose. Whatever the visitor types where [slug] sits
// gets handed to this component as `params.slug`.
//
// No "use client" here, so this is a SERVER component and may use Prisma.

import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

// Query the database on every request, so edits in PostgreSQL show up
// on the next refresh instead of being frozen at build time.
export const dynamic = "force-dynamic";

// Fetch exactly one asana by its slug.
//
// Returns { asana } on success — where `asana` is either the row or null —
// and { failed: true } if the database could not be reached. Those two
// situations need different screens: "no such pose" is a 404, but "database
// is down" is not the visitor's fault.
async function getAsana(slug) {
  try {
    const asana = await prisma.asana.findUnique({
      // `where` must name a UNIQUE column. slug is @unique in schema.prisma,
      // which is exactly what makes this line legal.
      where: { slug },

      // Fetch only the columns the page displays.
      select: {
        id: true,
        slug: true,
        name: true,
        englishName: true,
        level: true,
        category: true,
        emoji: true,
        description: true,
        benefits: true,
      },
    });

    return { asana };
  } catch (error) {
    console.error(`Could not load asana "${slug}":`, error);
    return { failed: true };
  }
}

// Sets the browser tab title and the description search engines read.
// Next.js calls this before rendering the page below.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { asana } = await getAsana(slug);

  if (!asana) {
    return { title: "Asana not found — YogShakti" };
  }

  return {
    title: `${asana.name} (${asana.englishName}) — YogShakti`,
    description: asana.description,
  };
}

export default async function AsanaDetailPage({ params }) {
  // In Next.js 15+ `params` is a PROMISE, so it has to be awaited.
  // Older tutorials write `params.slug` directly — that no longer works.
  const { slug } = await params;

  const { asana, failed } = await getAsana(slug);

  // The database itself is unreachable. Not a 404 — the pose may well exist.
  if (failed) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-3xl" aria-hidden="true">
          ⚠️
        </p>
        <h1 className="mt-3 text-xl font-semibold text-stone-900">
          Could not reach the database
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Check that PostgreSQL is running, then refresh.
        </p>
      </main>
    );
  }

  // findUnique() returns null when nothing matches. notFound() then renders
  // the 404 page and sends a real HTTP 404 status.
  //
  // Note this sits OUTSIDE the try/catch in getAsana(). notFound() works by
  // throwing a special error that Next.js catches. If it were called inside
  // a try block, our own catch would swallow it and the 404 would never show.
  if (!asana) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* Back link. <Link> navigates without a full page reload. */}
      <Link
        href="/#asanas"
        className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 transition hover:text-amber-900"
      >
        ← All asanas
      </Link>

      {/* ---- Title block ---- */}
      <header className="mt-6 border-b border-stone-200 pb-8">
        <span className="text-5xl" aria-hidden="true">
          {asana.emoji}
        </span>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          {asana.name}
        </h1>
        <p className="mt-1 text-lg text-stone-500">{asana.englishName}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
            {asana.level}
          </span>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
            {asana.category}
          </span>
        </div>
      </header>

      {/* ---- Description ---- */}
      <Section title="About this pose">
        <p className="leading-relaxed text-stone-700">{asana.description}</p>
      </Section>

      {/* ---- Benefits ---- */}
      <Section title="Benefits">
        <ul className="space-y-2">
          {asana.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-stone-700">
              <span className="text-amber-600" aria-hidden="true">
                ✓
              </span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---- Space reserved for future fields ----
          These sections are laid out now so the page shape is settled, but
          none of them have database columns yet. Adding a column later means
          swapping one <ComingSoon /> for real content — no redesign. */}
      <div className="mt-4 border-t border-stone-200 pt-8">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-400">
          Coming soon
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ComingSoon title="How to practise" note="Step-by-step instructions" />
          <ComingSoon title="Breathing" note="When to inhale and exhale" />
          <ComingSoon title="How long to hold" note="Suggested duration" />
          <ComingSoon title="Body areas" note="Muscles and joints involved" />
          <ComingSoon title="Common mistakes" note="What to watch out for" />
          <ComingSoon title="Beginner tips" note="Props and easier variations" />
          <ComingSoon title="Precautions" note="Practise with care if..." />
          <ComingSoon title="Contraindications" note="When to avoid this pose" />
        </div>
      </div>

      <p className="mt-10 border-t border-stone-200 pt-6 text-xs text-stone-500">
        For learning and general information only — not medical advice.
      </p>
    </main>
  );
}

// A small helper component, used a few times above. Defining it in the same
// file is fine while it is only needed here.
function Section({ title, children }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold text-stone-900">{title}</h2>
      {children}
    </section>
  );
}

// Placeholder card for a field the database does not store yet.
function ComingSoon({ title, note }) {
  return (
    <div className="rounded-xl border border-dashed border-stone-300 bg-stone-50 p-4">
      <p className="text-sm font-medium text-stone-700">{title}</p>
      <p className="mt-1 text-xs text-stone-500">{note}</p>
    </div>
  );
}
