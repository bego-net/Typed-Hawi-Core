interface ProductCardProps {
  title: string
  description: string
  eyebrow: string
  accentClassName: string
}

function ProductCard({
  title,
  description,
  eyebrow,
  accentClassName,
}: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-100">
      <div className={`relative h-48 overflow-hidden ${accentClassName}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.65),_transparent_35%),linear-gradient(135deg,_rgba(255,255,255,0.08),_rgba(15,23,42,0.12))]" />
        <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/85 text-sm font-bold tracking-[0.24em] text-slate-950 shadow-lg shadow-slate-900/10 backdrop-blur">
          HS
        </div>
        <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
            {eyebrow}
          </p>
          <div className="mt-3 h-1.5 w-24 rounded-full bg-white/80" />
          <div className="mt-2 h-1.5 w-16 rounded-full bg-white/55" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold tracking-tight text-slate-950 transition duration-300 group-hover:text-sky-700">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </article>
  )
}

export default ProductCard
