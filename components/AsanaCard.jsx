// AsanaCard.jsx
//
// Renders exactly ONE asana. It receives that asana as a prop:
//
//   <AsanaCard asana={someAsanaObject} />
//
// Keeping it to one item makes the component easy to reason about and easy
// to reuse anywhere else in the app later.

export default function AsanaCard({ asana }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-300 hover:shadow-md">
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

      {/* mt-auto pushes this line to the bottom so all cards line up neatly */}
      <p className="mt-auto pt-4 text-xs font-medium uppercase tracking-wide text-stone-400">
        {asana.category}
      </p>
    </article>
  );
}
