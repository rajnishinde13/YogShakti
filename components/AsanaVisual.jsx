// AsanaVisual.jsx
//
// The visual identity of a pose. Replaces the emoji that used to sit at the
// top of each card.
//
// Two modes:
//   - If the asana has an imageUrl, that photograph or illustration is shown.
//   - Otherwise an abstract mark is drawn: a soft gradient panel with a simple
//     line figure. It is deliberately not a picture of the pose — it holds the
//     space, tinted by category, until a real image exists.
//
// Adding images later means filling in the imageUrl column. No code change
// here, no migration.

// Each category gets its own muted tint. All the colours are very pale so the
// grid stays calm rather than turning into a colour chart.
//
// Tailwind only keeps classes it can see written out in full, so these are
// complete strings rather than something built with string joining.
const TINTS = {
  Standing: { panel: "from-amber-50 to-amber-100/70", mark: "text-amber-700/60" },
  Balancing: { panel: "from-emerald-50 to-emerald-100/70", mark: "text-emerald-700/60" },
  Backbend: { panel: "from-rose-50 to-rose-100/70", mark: "text-rose-700/60" },
  "Forward Bend": { panel: "from-sky-50 to-sky-100/70", mark: "text-sky-700/60" },
  "Hip Opener": { panel: "from-teal-50 to-teal-100/70", mark: "text-teal-700/60" },
  Core: { panel: "from-orange-50 to-orange-100/70", mark: "text-orange-700/60" },
  "Warm-up": { panel: "from-lime-50 to-lime-100/70", mark: "text-lime-700/60" },
  Inversion: { panel: "from-indigo-50 to-indigo-100/70", mark: "text-indigo-700/60" },
  Resting: { panel: "from-stone-100 to-stone-200/70", mark: "text-stone-600/60" },
};

// Used when a category has no entry above — new categories still look right.
const DEFAULT_TINT = {
  panel: "from-stone-100 to-stone-200/70",
  mark: "text-stone-600/60",
};

export default function AsanaVisual({ asana, variant = "card" }) {
  const tint = TINTS[asana.category] ?? DEFAULT_TINT;

  // Cards get a shallow band; the detail page gets a taller panel.
  const shape = variant === "detail" ? "aspect-[21/9]" : "aspect-[16/10]";

  // A real image, once one exists.
  if (asana.imageUrl) {
    return (
      <div className={`${shape} w-full overflow-hidden rounded-xl bg-stone-100`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asana.imageUrl}
          alt={`${asana.name} — ${asana.englishName}`}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // The placeholder.
  return (
    <div
      className={`${shape} relative w-full overflow-hidden rounded-xl bg-gradient-to-br ${tint.panel}`}
      // Decorative only — the pose name is already written next to it, so a
      // screen reader gains nothing from describing this panel.
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        className={`absolute inset-0 h-full w-full ${tint.mark}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* A small circle above two open arcs: a figure at rest, reduced to
            three strokes. Abstract on purpose — no cartoon, no literal pose. */}
        <circle cx="60" cy="20" r="6.5" />
        <path d="M38 42 Q60 26 82 42" />
        <path d="M46 50 Q60 39 74 50" opacity="0.55" />

        {/* A faint horizon line, for a sense of ground. */}
        <path d="M18 55 H102" opacity="0.25" />
      </svg>
    </div>
  );
}
