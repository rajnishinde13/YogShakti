// AsanaCard.jsx
//
// Renders exactly ONE asana. It receives that asana as a prop:
//
//   <AsanaCard asana={someAsanaObject} />
//
// The whole card is a <Link>, so clicking anywhere on it opens the detail
// page. <Link> comes from Next.js and swaps the page contents without a full
// browser reload, which is why navigation feels instant.

import Link from "next/link";

export default function AsanaCard({ asana }) {
  return (
    <Link
      // Template literal builds the address from the slug:
      // "tadasana" becomes "/asana/tadasana".
      href={`/asana/${asana.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
    >
      {/* Top row: emoji + level badge */}
      <div className="mb-4 flex items-start justify-between">
        <span className="text-3xl" aria-hidden="true">
          {asana.emoji}
        </span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
          {asana.level}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-stone-900">{asana.name}</h3>
      <p className="text-sm text-stone-500">{asana.englishName}</p>

      <p className="mt-3 text-sm leading-relaxed text-stone-600">
        {asana.description}
      </p>

      {/* benefits is an ARRAY of strings, so we map() over it too.
          Every mapped element needs a unique "key" so React can track it. */}
      <ul className="mt-4 flex flex-wrap gap-2">
        {asana.benefits.map((benefit) => (
          <li
            key={benefit}
            className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600"
          >
            {benefit}
          </li>
        ))}
      </ul>

      {/* mt-auto pushes this row to the bottom so all cards line up neatly */}
      <div className="mt-auto flex items-center justify-between pt-5">
        <span className="text-xs font-medium uppercase tracking-wide text-stone-400">
          {asana.category}
        </span>

        {/* group-hover:* reacts to hovering the whole card, not just this text.
            That works because the <Link> above has the "group" class. */}
        <span className="text-sm font-medium text-amber-700 transition group-hover:text-amber-900">
          View Asana{" "}
          <span
            aria-hidden="true"
            className="inline-block transition group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
