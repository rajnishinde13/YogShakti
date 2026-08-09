// About.jsx
//
// The About section on the homepage. This is what the header's "About" link
// scrolls to, so the id below has to stay as "about".
//
// It used to live on the <footer>, which meant the link pointed at a strip of
// small print rather than a real section.

export default function About() {
  return (
    <section id="about" className="border-t border-stone-200 bg-stone-50/60">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-xs font-medium uppercase tracking-widest text-amber-700">
          About
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          About YogShakti
        </h2>

        <div className="mt-5 space-y-4 text-stone-600">
          <p className="leading-relaxed">
            YogShakti is a searchable knowledge base for yoga asanas. Explore
            poses by Sanskrit name, English name, category, level or benefit,
            then view clear guidance on how to practise each pose safely.
          </p>

          <p className="leading-relaxed">
            Every pose includes step-by-step instructions, breathing guidance,
            how long to hold it, the body areas involved, common mistakes,
            beginner tips and safety notes — so the goal is understanding a
            pose, not just recognising its name.
          </p>

          <p className="leading-relaxed">
            Built as a learning project by{" "}
            <span className="font-medium text-amber-700">@risingwithrajni</span>{" "}
            using Next.js, React, PostgreSQL and Prisma.
          </p>
        </div>

        {/* The disclaimer is set apart rather than buried in the prose,
            because it is the one thing here that genuinely matters. */}
        <p className="mt-8 rounded-xl border border-stone-200 bg-white px-5 py-4 text-sm leading-relaxed text-stone-600">
          The content on YogShakti is for learning and general information only
          — it is not medical advice. If you are pregnant, recovering from
          injury or managing a health condition, speak to a qualified teacher or
          doctor before beginning a practice.
        </p>
      </div>
    </section>
  );
}
