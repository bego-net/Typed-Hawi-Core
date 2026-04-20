export type ServiceCardItem = {
  title: string
  description: string
  icon?: string
}

type ServiceCardsProps = {
  eyebrow?: string
  title: string
  items: ServiceCardItem[]
  columns?: 2 | 3
}

function ServiceCards({
  eyebrow = 'Benefits',
  title,
  items,
  columns = 3,
}: ServiceCardsProps) {
  const gridClass =
    columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-rose-700">
            {eyebrow}
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className={`mt-14 grid gap-6 ${gridClass}`}>
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rose-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 text-base font-bold tracking-[0.18em] text-white shadow-lg shadow-rose-200">
                {item.icon ?? '★'}
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServiceCards

