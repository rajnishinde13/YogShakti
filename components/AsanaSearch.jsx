// AsanaSearch.jsx
//
// Everything interactive on the homepage lives here.
//
// "use client" means this component runs in the BROWSER. It has to, because
// useState and fetch-on-click only exist there.
//
// Where the data comes from, in two stages:
//   1. First paint  -> the `asanas` prop, already fetched from PostgreSQL by
//                      the server in app/page.js. The page is useful instantly.
//   2. After a search -> whatever GET /api/search returns.
"use client";

import { useState } from "react";

import SearchBar from "./SearchBar";
import AsanaList from "./AsanaList";

export default function AsanaSearch({ asanas }) {
  // 1. What the visitor has typed. Updates on every keystroke.
  const [query, setQuery] = useState("");

  // 2. The search results.
  //    null        = no search has been run yet -> show the full list
  //    []          = a search ran and matched nothing
  //    [ ...rows ] = a search ran and matched these
  //    Using null rather than [] is what lets us tell "haven't searched" apart
  //    from "searched, found nothing" — they need different screens.
  const [results, setResults] = useState(null);

  // 3. True while waiting for the server to answer.
  const [loading, setLoading] = useState(false);

  // 4. A message to show if the request fails.
  const [error, setError] = useState(null);

  // The term the current results belong to. Kept separate from `query` so the
  // heading keeps saying "results for tadasana" even as the visitor types
  // something new into the box.
  const [searchedFor, setSearchedFor] = useState("");

  // `async` because we `await` the network request inside.
  async function handleSearch(event) {
    // A form would normally reload the whole page when submitted. This stops
    // that, so React can update just the results instead.
    event.preventDefault();

    const term = query.trim();

    // Empty box: clear everything and go back to showing all asanas.
    if (term === "") {
      setResults(null);
      setError(null);
      setSearchedFor("");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // encodeURIComponent makes the text safe to put in a URL: a space
      // becomes %20, "&" becomes %26. Without it, a search for "a & b" would
      // look like a second query parameter and the term would be cut short.
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);

      // fetch() does NOT throw on 404 or 500 — it only rejects if the network
      // itself failed. A server error still counts as a successful round trip,
      // so the status has to be checked by hand.
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      // .json() reads the response body and parses the JSON text into a
      // JavaScript object. It is asynchronous too, hence the second await.
      const data = await response.json();

      setResults(data.results);
      setSearchedFor(data.query);
    } catch (caught) {
      // Reaching here means the network failed or the server returned an
      // error status. The real detail goes to the console for us; the visitor
      // gets a plain sentence.
      console.error("Search request failed:", caught);
      setError("Something went wrong while searching. Please try again.");
      setResults(null);
    } finally {
      // `finally` runs whether the try succeeded or the catch fired, so the
      // spinner can never get stuck on.
      setLoading(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setResults(null);
    setError(null);
    setSearchedFor("");
  }

  // Before any search, show the full list the server already sent.
  const isSearching = results !== null;
  const shown = isSearching ? results : asanas;

  return (
    <>
      {/* Search area */}
      <section className="px-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          loading={loading}
        />
      </section>

      {/* Results */}
      <section id="asanas" className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
            {isSearching ? (
              <>
                Results for{" "}
                <span className="text-amber-700">“{searchedFor}”</span>
              </>
            ) : (
              "All asanas"
            )}
          </h2>

          <div className="flex items-center gap-4">
            <p className="text-sm text-stone-500">
              {shown.length} {shown.length === 1 ? "asana" : "asanas"}
            </p>

            {isSearching && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-sm font-medium text-amber-700 transition hover:text-amber-900"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Four possible screens, checked in order. */}

        {/* A) Waiting for the server. */}
        {loading && (
          <div className="rounded-2xl border border-stone-200 bg-white py-16 text-center">
            <p className="animate-pulse text-2xl" aria-hidden="true">
              🔍
            </p>
            <p className="mt-2 text-sm text-stone-500">Searching...</p>
          </div>
        )}

        {/* B) The request failed. */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 py-12 text-center"
          >
            <p className="text-2xl" aria-hidden="true">
              ⚠️
            </p>
            <p className="mt-2 font-medium text-red-800">{error}</p>
          </div>
        )}

        {/* C) and D) Results, or the "nothing matched" message.
            AsanaList already handles the empty array; we just give it wording
            that fits a search. */}
        {!loading && !error && (
          <AsanaList
            asanas={shown}
            emptyTitle="No matching asanas found"
            emptyHint={`Nothing matched “${searchedFor}”. Try a pose name, a category like “standing”, or a benefit like “balance”.`}
          />
        )}
      </section>
    </>
  );
}
