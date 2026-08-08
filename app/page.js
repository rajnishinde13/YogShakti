// "use client" tells Next.js this component runs in the browser.
// We need it because we use useState — React state only exists in the browser.
"use client";

import { useState } from "react";

import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import AsanaList from "@/components/AsanaList";
import asanas from "@/data/asanas";

export default function HomePage() {
  // ONE piece of state: whatever the user has typed in the search box.
  // query        -> the current value
  // setQuery     -> the function that changes it (and re-renders the page)
  // useState("") -> the starting value is an empty string
  const [query, setQuery] = useState("");

  // Lowercase + trim once, so the comparison below is case-insensitive
  // and ignores stray spaces.
  const search = query.trim().toLowerCase();

  // .filter() builds a NEW array containing only the asanas that match.
  // The original `asanas` array is never modified.
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
    <main>
      <Hero />

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
    </main>
  );
}
