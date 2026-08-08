// AsanaList.jsx
//
// Receives an ARRAY of asanas as a prop and turns it into a grid of cards
// using .map(). This is the single most common pattern in React:
//
//   array of data  ->  .map()  ->  array of components
//
// It also handles the "nothing to show" case, which is easy to forget.

import AsanaCard from "./AsanaCard";

// emptyTitle and emptyHint have DEFAULT VALUES, written with "=". If the
// parent does not pass them, these are used. That lets the search results
// show a different message from the normal listing without a second component.
export default function AsanaList({
  asanas,
  emptyTitle = "No asanas found",
  emptyHint = "Try a different name, level or category.",
}) {
  if (asanas.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center">
        <p className="text-2xl" aria-hidden="true">
          🍃
        </p>
        <p className="mt-2 font-medium text-stone-700">{emptyTitle}</p>
        <p className="mt-1 text-sm text-stone-500">{emptyHint}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {asanas.map((asana) => (
        // key must be unique and stable — the database id is perfect for this.
        <AsanaCard key={asana.id} asana={asana} />
      ))}
    </div>
  );
}
