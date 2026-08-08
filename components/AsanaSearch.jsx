// AsanaSearch.jsx
//
// Everything interactive on the homepage lives here.
//
// "use client" means this component runs in the BROWSER. It has to, because
// useState only exists in the browser — the server renders HTML once and
// then forgets about it, so it has nowhere to keep "what has the user typed".
"use client";

import { useState } from "react";

import SearchBar from "./SearchBar";
import AsanaList from "./AsanaList";

// The asanas arrive as a PROP from app/page.js, which fetched them from
// PostgreSQL on the server. This component never talks to the database and
// does not know or care where the array came from.
export default function AsanaSearch({ asanas }) {
  // ONE piece of state: whatever the user has typed in the search box.
  const [query, setQuery] = useState("");

  // Lowercase + trim once, so the comparison is case-insensitive
  // and ignores stray spaces.
  const search = query.trim().toLowerCase();

  // .filter() builds a NEW array containing only the asanas that match.
  // The original array is never modified.
  //
  // Note this filtering still happens in the browser, over the rows the
  // server already sent. Moving the search itself into SQL is a later phase.
  const results = asanas.filter((asana) => {
    // No search text? Show everything.
    if (search === "") {
      return true;
    }

    // Glue the searchable fields into one string, then check if the
    // search text appears anywhere inside it.
    const haystack = [
      asana.name,
      asana.englishName,
      asana.category,
      asana.level,
      ...asana.benefits, // "..." spreads the benefits array into this list
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(search);
  });

  return (
    <>
      {/* Search area */}
      <section className="px-4">
        <SearchBar value={query} onChange={setQuery} />
      </section>

      {/* Results */}
      <section id="asanas" className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
            {search === "" ? "All asanas" : "Search results"}
          </h2>
          <p className="text-sm text-stone-500">
            {results.length} {results.length === 1 ? "asana" : "asanas"}
          </p>
        </div>

        <AsanaList asanas={results} />
      </section>
    </>
  );
}
