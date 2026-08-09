// Header.jsx
// The bar at the very top of every page. It takes no props — it always
// looks the same — so it is about as simple as a React component gets.

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {/* Brand. Links home, which is what people expect from a site logo
            and gives an easy way back from a detail page. */}
        <Link
          href="/"
          className="flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
        >
          <span className="text-2xl" aria-hidden="true">
            🪷
          </span>
          <span className="text-xl font-semibold tracking-tight text-stone-900">
            Yog<span className="text-amber-700">Shakti</span>
          </span>
        </Link>

        {/* Nav.
            The leading slash matters. "#asanas" on its own means "the section
            called asanas ON THE PAGE YOU ARE ALREADY ON" — so from
            /asana/savasana it produced /asana/savasana#asanas and did nothing,
            because that section only exists on the homepage.
            "/#asanas" means "go to the homepage, then to that section", which
            works from anywhere in the site.

            These are plain <a> tags, NOT next/link, on purpose. Next.js Link
            does client-side navigation, and its scroll-to-hash is unreliable
            when arriving from a different route. A plain <a> hands the job to
            the browser, whose native anchor scrolling always works. The cost
            is a full page reload — an acceptable trade for navigation that
            behaves predictably from every page.

            The logo below still uses Link, because "/" has no hash to scroll
            to and benefits from the faster client-side navigation. */}
        <nav className="hidden gap-6 text-sm font-medium text-stone-600 sm:flex">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
              plain <a> is intentional here; see the note above. */}
          <a className="transition hover:text-amber-700" href="/#asanas">
            Asanas
          </a>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
              plain <a> is intentional here; see the note above. */}
          <a className="transition hover:text-amber-700" href="/#about">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
