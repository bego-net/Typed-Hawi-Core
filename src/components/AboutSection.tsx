const values = [
  {
    title: 'Mission',
    description:
      'Deliver dependable software solutions that simplify operations, improve experiences, and unlock measurable growth.',
    icon: 'M',
  },
  {
    title: 'Vision',
    description:
      'Shape a better future through technology by building products that empower businesses across industries and regions.',
    icon: 'V',
  },
]

function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <div>
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
            About Us
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            A software company built around thoughtful design and solid
            engineering
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Hawi Software partners with forward-looking organizations to design,
            build, and improve digital products. Our approach combines clean
            user experiences, reliable architecture, and close collaboration so
            every solution feels purposeful from day one.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Company Focus
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Custom platforms, internal systems, and customer-facing software
                experiences that are modern, fast, and scalable.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                Working Style
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Clear communication, careful execution, and long-term product
                thinking at every stage of delivery.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-8 shadow-md shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-bold text-white shadow-lg shadow-cyan-500/20">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-950">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {value.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
