// SearchBar.jsx
//
// This component is "controlled" — it does NOT own the search text.
// The text lives in app/page.js and is handed down here through PROPS:
//
//   value    -> the current text to display in the input
//   onChange -> a function to call when the user types
//
// This pattern is called "lifting state up". It matters because page.js
// also needs the search text in order to filter the list of asanas.

export default function SearchBar({ value, onChange }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <label htmlFor="asana-search" className="sr-only">
        Search asanas
      </label>

      <div className="relative">
        {/* Magnifying glass sitting inside the input */}
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
          aria-hidden="true"
        >
          🔍
        </span>

        <input
          id="asana-search"
          type="text"
          value={value}
          // e.target.value is whatever is currently typed in the box.
          onChange={(e) => onChange(e.target.value)}
          placeholder="Try 'Tadasana', 'balance' or 'backbend'..."
          className="w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-4 text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
        />
      </div>
    </div>
  );
}
