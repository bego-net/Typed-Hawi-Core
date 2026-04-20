type ServiceDescriptionProps = {
  eyebrow?: string
  title: string
  paragraphs: string[]
}

function ServiceDescription({ eyebrow = 'Overview', title, paragraphs }: ServiceDescriptionProps) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">
            {eyebrow}
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/70 sm:p-10">
          {paragraphs.map((p) => (
            <p key={p} className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceDescription

