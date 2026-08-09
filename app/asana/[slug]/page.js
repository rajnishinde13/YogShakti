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
import AsanaVisual from "@/components/AsanaVisual";

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

      // Everything the page displays. Left out on purpose: createdAt and
      // updatedAt, which are Date objects the page has no use for.
      select: {
        id: true,
        slug: true,
        name: true,
        englishName: true,
        level: true,
        category: true,
        description: true,
        benefits: true,
        steps: true,
        breathing: true,
        duration: true,
        bodyAreas: true,
        commonMistakes: true,
        beginnerTips: true,
        precautions: true,
        contraindications: true,

        // Tradition and sources. All optional — most poses have none of
        // these, and the section below simply does not render when they are
        // all null.
        sanskritName: true,
        devanagari: true,
        transliteration: true,
        tradition: true,
        sourceText: true,
        sourceChapter: true,
        sourceVerse: true,
        historicalNotes: true,

        // Image and its attribution.
        imageUrl: true,
        imageAlt: true,
        imageSource: true,
        imageLicense: true,
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

  // Build the rows for "Tradition & Sources", keeping only the fields that
  // actually have a value.
  //
  // Most poses have none of these, and even the ones that do rarely have all
  // of them — so the page has to cope with any combination. Assembling an
  // array and filtering it is far easier to follow than eight separate
  // conditionals in the markup, and it guarantees no empty labels appear.
  const sourceRows = [
    { label: "Sanskrit name", value: asana.sanskritName },
    { label: "Devanagari", value: asana.devanagari, large: true },
    { label: "Transliteration", value: asana.transliteration },
    { label: "Tradition", value: asana.tradition },
    { label: "Source text", value: asana.sourceText },
    {
      label: "Chapter / verse",
      // Join whichever of the two exists. If neither does this is an empty
      // string, and the filter below drops the row entirely.
      value: [asana.sourceChapter, asana.sourceVerse].filter(Boolean).join(" · "),
    },
  ].filter((row) => row.value);

  // The whole section is hidden unless there is something real to put in it.
  const hasSources = sourceRows.length > 0 || Boolean(asana.historicalNotes);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {/* Back link. <Link> navigates without a full page reload. */}
      <Link
        href="/#asanas"
        className="inline-flex items-center gap-1 text-sm font-medium text-amber-700 transition hover:text-amber-900"
      >
        ← All asanas
      </Link>

      {/* ---- Visual ---- */}
      <figure className="mt-6">
        <AsanaVisual asana={asana} variant="detail" />

        {/* Credit line. Only appears once a real image with attribution
            exists — no pose has one yet, so this renders nothing today. */}
        {asana.imageSource && (
          <figcaption className="mt-2 text-xs text-stone-500">
            Image: {asana.imageSource}
            {asana.imageLicense && ` · ${asana.imageLicense}`}
          </figcaption>
        )}
      </figure>

      {/* ---- Title block ---- */}
      <header className="mt-8 border-b border-stone-200 pb-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
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

      {/* ---- About ---- */}
      <Section title="About this pose">
        <p className="leading-relaxed text-stone-700">{asana.description}</p>
      </Section>

      {/* ---- Benefits ---- */}
      <Section title="Benefits">
        <TickList items={asana.benefits} />
      </Section>

      {/* ---- Steps: an ORDERED list, because sequence matters here ---- */}
      <Section title="How to practise">
        <ol className="space-y-3">
          {asana.steps.map((step, index) => (
            <li key={step} className="flex gap-4">
              {/* index comes from map()'s second argument. It starts at 0,
                  so +1 turns it into a human step number. */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-50 text-xs font-semibold text-amber-800">
                {index + 1}
              </span>
              <span className="pt-0.5 leading-relaxed text-stone-700">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---- Breathing and duration, side by side ---- */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <InfoCard title="Breathing">
          <p className="leading-relaxed text-stone-700">{asana.breathing}</p>
        </InfoCard>

        <InfoCard title="How long to hold">
          <p className="leading-relaxed text-stone-700">{asana.duration}</p>
        </InfoCard>
      </div>

      {/* ---- Body areas, as chips ---- */}
      <Section title="Body areas">
        <ul className="flex flex-wrap gap-2">
          {asana.bodyAreas.map((area) => (
            <li
              key={area}
              className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm text-stone-600"
            >
              {area}
            </li>
          ))}
        </ul>
      </Section>

      {/* ---- Mistakes and tips, side by side ---- */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <InfoCard title="Common mistakes">
          <BulletList items={asana.commonMistakes} marker="·" />
        </InfoCard>

        <InfoCard title="Beginner tips">
          <BulletList items={asana.beginnerTips} marker="·" />
        </InfoCard>
      </div>

      {/* ---- Safety. Set apart visually, because it matters most. ---- */}
      <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-800">
          Practise safely
        </h2>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-stone-900">
              Precautions
            </h3>
            <BulletList items={asana.precautions} marker="·" />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-stone-900">
              Avoid or seek guidance
            </h3>
            <BulletList items={asana.contraindications} marker="·" />
          </div>
        </div>
      </div>

      {/* ---- Tradition & Sources ----
          Rendered only when at least one field has a value. Empty labels
          never appear, because sourceRows was filtered above. */}
      {hasSources && (
        <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
            Tradition &amp; Sources
          </h2>

          {sourceRows.length > 0 && (
            // A description list: <dt> is the term, <dd> its value. Wrapping
            // each pair in a <div> to lay them out side by side is valid HTML.
            <dl className="mt-5 space-y-3">
              {sourceRows.map((row) => (
                <div key={row.label} className="sm:flex sm:gap-6">
                  <dt className="text-sm text-stone-500 sm:w-40 sm:shrink-0">
                    {row.label}
                  </dt>
                  <dd
                    className={
                      row.large
                        ? "text-lg leading-snug text-stone-900"
                        : "text-sm text-stone-800"
                    }
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {asana.historicalNotes && (
            <div className="mt-5 border-t border-stone-200 pt-5">
              <p className="text-sm leading-relaxed text-stone-600">
                {asana.historicalNotes}
              </p>
            </div>
          )}
        </section>
      )}

      <p className="mt-10 border-t border-stone-200 pt-6 text-xs leading-relaxed text-stone-500">
        For learning and general information only — not medical advice. If you
        are pregnant, recovering from injury or managing a health condition,
        speak to a qualified teacher or doctor before practising.
      </p>
    </main>
  );
}

// ---------------------------------------------------------------------------
// Small helper components. They live in this file because nothing else uses
// them yet. If another page needs one, that is the moment to move it into
// components/ — not before.
// ---------------------------------------------------------------------------

function Section({ title, children }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-semibold text-stone-900">{title}</h2>
      {children}
    </section>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-stone-500">
        {title}
      </h3>
      {children}
    </div>
  );
}

function TickList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-stone-700">
          <span className="text-amber-600" aria-hidden="true">
            ✓
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BulletList({ items, marker }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-sm text-stone-700">
          <span className="text-stone-400" aria-hidden="true">
            {marker}
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
