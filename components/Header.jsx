// Header.jsx
// The bar at the very top of every page. It takes no props — it always
// looks the same — so it is about as simple as a React component gets.

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">
            🪷
          </span>
          <span className="text-xl font-semibold tracking-tight text-stone-900">
            Yog<span className="text-amber-700">Shakti</span>
          </span>
        </div>

        {/* Nav. These are plain <a> tags for now — the pages do not exist yet. */}
        <nav className="hidden gap-6 text-sm font-medium text-stone-600 sm:flex">
          <a className="transition hover:text-amber-700" href="#asanas">
            Asanas
          </a>
          <a className="transition hover:text-amber-700" href="#about">
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
