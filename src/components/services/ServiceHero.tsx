type ServiceHeroProps = {
  title: string
  subtitle?: string
  imageSrc: string
  imageAlt?: string
  badgeText?: string
}

function ServiceHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  badgeText = 'Services',
}: ServiceHeroProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
              {badgeText}
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm shadow-slate-200/70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.16),_transparent_40%)]" />
            <div className="relative p-4 sm:p-6">
              <img
                src={imageSrc}
                alt={imageAlt ?? title}
                className="h-auto w-full rounded-[1.5rem] border border-slate-200 bg-white object-cover shadow-sm"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceHero

