// app/asana/[slug]/not-found.js
//
// Next.js renders this file automatically whenever notFound() is called
// inside this route segment — and sends a real HTTP 404 status with it,
// which is what tells search engines the page does not exist.
//
// Putting it here rather than at the top of app/ means the message can be
// specific: "that pose does not exist", not just "page not found".

import Link from "next/link";

export default function AsanaNotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-4xl" aria-hidden="true">
        🔍
      </p>

      <h1 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">
        Asana not found
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-stone-600">
        We could not find a pose at that address. It may have been renamed, or
        the spelling might be slightly off.
      </p>

      <Link
        href="/#asanas"
        className="mt-8 inline-block rounded-full bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-800"
      >
        Browse all asanas
      </Link>
    </main>
  );
}
