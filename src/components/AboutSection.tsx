/**
 * Modernized AboutSection
 * - Same content as original (Mission / Vision)
 * - Improved semantics (section, dl/dt/dd)
 * - Accessible: aria, visible focus rings
 * - Better visuals: gradients, subtle motion, shadow, responsive layout
 */

const values = [
  {
    title: "Mission",
    description:
      "Deliver dependable software solutions that simplify operations, improve experiences, and unlock measurable growth.",
    iconLabel: "M",
  },
  {
    title: "Vision",
    description:
      "Shape a better future through technology by building products that empower businesses across industries and regions.",
    iconLabel: "V",
  },
];

function IconPill({ label }: { label: string }) {
  return (
    <div
      className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20"
      aria-hidden="true"
    >
      {label}
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      {/* Decorative blurred gradient */}
      <div
        className="pointer-events-none absolute -right-40 -top-24 -z-10 h-[480px] w-[480px] rotate-12 transform-gpu blur-3xl opacity-30"
        aria-hidden="true"
      >
        <div className="h-full w-full rounded-full bg-gradient-to-br from-cyan-100 via-sky-50 to-indigo-50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left column: intro */}
          <div>
            <span className="inline-flex items-center rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-sky-700 ring-1 ring-sky-100">
              About Us
            </span>

            <h2
              id="about-heading"
              className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              A software company built around thoughtful design and solid engineering
            </h2>

            <p className="mt-6 max-w-prose text-base leading-7 text-slate-600">
              Hawi Software partners with forward-looking organizations to design, build,
              and improve digital products. Our approach combines clean user experiences,
              reliable architecture, and close collaboration so every solution feels
              purposeful from day one.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                  Company Focus
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Custom platforms, internal systems, and customer-facing software
                  experiences that are modern, fast, and scalable.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                  Working Style
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Clear communication, careful execution, and long-term product thinking
                  at every stage of delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: value cards */}
          <div>
            <dl className="grid gap-6 sm:grid-cols-1">
              {values.map((v) => {
                const id = `val-${v.title.toLowerCase()}`.replace(/\s+/g, "-");
                return (
                  <article
                    key={v.title}
                    className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl focus-within:-translate-y-2"
                    tabIndex={0}
                    aria-labelledby={`${id}-title`}
                    role="article"
                  >
                    <div className="flex items-start gap-4">
                      <IconPill label={v.iconLabel} />

                      <div>
                        <dt>
                          <h3
                            id={`${id}-title`}
                            className="text-xl font-semibold text-slate-900"
                          >
                            {v.title}
                          </h3>
                        </dt>
                        <dd className="mt-3 text-sm leading-7 text-slate-600">
                          {v.description}
                        </dd>
                      </div>
                    </div>

                    {/* subtle CTA or metadata row (kept minimal) */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        Core Value
                      </span>
                      <span className="ml-auto text-xs text-slate-400">
                        {v.title === "Mission" ? "Since 20XX" : "Future-focused"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}