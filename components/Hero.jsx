// Hero.jsx
// The big welcome section at the top of the homepage.

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-700">
          Yoga Asana Search Engine
        </p>

        <h1 className="text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl">
          Find the right asana, understand the why
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
          Search yoga poses by Sanskrit name, English name or category — and see
          what each one actually does for your body.
        </p>
      </div>
    </section>
  );
}
