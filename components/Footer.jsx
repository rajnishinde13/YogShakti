// Footer.jsx
// Sits at the bottom of every page.
//
// This used to carry id="about", which made the header's About link scroll to
// the small print. The real About section now lives in components/About.jsx
// on the homepage, so the id has been removed from here.

export default function Footer() {
  // Computed once when the component renders, so the year never goes stale.
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold text-stone-900">
              Yog<span className="text-amber-700">Shakti</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              A searchable knowledge base for yoga asanas.
            </p>
          </div>

          <div className="text-sm text-stone-600">
            <p className="font-medium text-stone-900">Project</p>
            <p className="mt-2">
              Built by{" "}
              <span className="font-medium text-amber-700">@risingwithrajni</span>
            </p>
            {/* Evergreen — describes the stack rather than a phase number,
                so it does not go stale as the project moves on. */}
            <p className="mt-1">Built with Next.js, PostgreSQL &amp; Prisma</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-stone-200 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} YogShakti. For learning and general information only — not
            medical advice.
          </p>

          {/* Same as the header: leading slash so they work from a detail
              page, and plain <a> rather than next/link so the browser's own
              anchor scrolling handles the jump reliably. */}
          <nav className="flex gap-4">
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
      </div>
    </footer>
  );
}
