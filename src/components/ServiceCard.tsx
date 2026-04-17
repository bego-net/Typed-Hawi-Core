interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70 transition duration-300 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-2xl hover:shadow-sky-100">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-orange-400 text-xl font-bold text-white shadow-lg shadow-rose-200 transition duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-950">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
    </article>
  )
}

export default ServiceCard
