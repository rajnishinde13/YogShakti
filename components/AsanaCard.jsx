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

import AsanaVisual from "./AsanaVisual";

export default function AsanaCard({ asana }) {
  return (
    <Link
      // Template literal builds the address from the slug:
      // "tadasana" becomes "/asana/tadasana".
      href={`/asana/${asana.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
    >
      {/* The pose visual. An abstract placeholder for now; a real image as
          soon as the imageUrl column has a value. */}
      <AsanaVisual asana={asana} />

      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        <h3 className="text-lg font-semibold leading-tight text-stone-900">
          {asana.name}
        </h3>
        <p className="mt-0.5 text-sm text-stone-500">{asana.englishName}</p>

        {/* line-clamp-2 keeps every card the same height however long the
            description happens to be. */}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600">
          {asana.description}
        </p>

        {/* Level and category. mt-auto pushes everything below it to the
            bottom, so all cards line up neatly however long the text is. */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
            {asana.level}
          </span>
          <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">
            {asana.category}
          </span>
        </div>

        <div className="mt-4 border-t border-stone-100 pt-3">
          {/* group-hover:* reacts to hovering the whole card, not just this
              text. That works because the <Link> above has the "group" class. */}
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
      </div>
    </Link>
  );
}
