// SearchBar.jsx
//
// A <form> wrapping the input and a Search button.
//
// Using a real <form> gives the Enter key for free: pressing Enter inside a
// form input fires the form's onSubmit, the same handler the button uses.
// No keyboard event handling needed.
//
// This component is still "controlled" — it owns nothing. The text lives in
// AsanaSearch and arrives here through PROPS:
//
//   value    -> the text to display
//   onChange -> called when the user types
//   onSubmit -> called on Enter or button click
//   loading  -> true while the search request is in flight

export default function SearchBar({ value, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-xl">
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
          placeholder="Try 'tadasana', 'mountain' or 'balance'..."
          // pr-28 leaves room for the button sitting on top of the input.
          className="w-full rounded-full border border-stone-300 bg-white py-3 pl-11 pr-28 text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20"
        />

        {/* type="submit" is what connects this button to the form's onSubmit */}
        <button
          type="submit"
          disabled={loading}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-amber-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-amber-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>
    </form>
  );
}
