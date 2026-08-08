// Footer.jsx
// Sits at the bottom of every page.

export default function Footer() {
  // Computed once when the component renders, so the year never goes stale.
  const year = new Date().getFullYear();

  return (
    <footer id="about" className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-semibold text-stone-900">
              Yog<span className="text-amber-700">Shakti</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              A search engine and knowledge base for yoga asanas. Built in the
              open, one phase at a time.
            </p>
          </div>

          <div className="text-sm text-stone-600">
            <p className="font-medium text-stone-900">Project</p>
            <p className="mt-2">
              Built by{" "}
              <span className="font-medium text-amber-700">@risingwithrajni</span>
            </p>
            <p className="mt-1">Phase 1 — Frontend foundation</p>
          </div>
        </div>

        <p className="mt-8 border-t border-stone-200 pt-6 text-xs text-stone-500">
          © {year} YogShakti. For learning and general information only — not
          medical advice.
        </p>
      </div>
    </footer>
  );
}
