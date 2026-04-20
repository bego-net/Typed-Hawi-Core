export type ServiceProcessStep = {
  title: string
  description: string
}

type ServiceProcessProps = {
  eyebrow?: string
  title: string
  steps: ServiceProcessStep[]
}

function ServiceProcess({
  eyebrow = 'Process',
  title,
  steps,
}: ServiceProcessProps) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
            {eyebrow}
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <article
              key={step.title}
              className="rounded-[2rem] border border-emerald-200/60 bg-emerald-500 p-7 text-white shadow-sm shadow-emerald-100/70"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-sm font-bold tracking-[0.24em] backdrop-blur">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/90">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceProcess

