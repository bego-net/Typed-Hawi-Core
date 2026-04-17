import { useEffect, useState } from 'react'
import api from '../api/axios'
import type { Service } from '../types/service'

type ServiceResponse = Service[] | { data: Service[] }

const isImageIcon = (icon: string) =>
  icon.startsWith('http://') ||
  icon.startsWith('https://') ||
  icon.startsWith('/') ||
  icon.startsWith('data:image')

const getIconLabel = (service: Service) => {
  if (service.icon.trim()) {
    return service.icon.trim().slice(0, 2).toUpperCase()
  }

  return service.title.slice(0, 2).toUpperCase()
}

function ServicesSection() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await api.get<ServiceResponse>('/services')
        const serviceData = Array.isArray(response.data)
          ? response.data
          : response.data.data

        setServices(serviceData)
      } catch {
        setError('Unable to load services right now.')
      } finally {
        setLoading(false)
      }
    }

    void fetchServices()
  }, [])

  return (
    <section
      id="services"
      className="bg-[linear-gradient(180deg,_#0f172a_0%,_#111827_100%)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
            Services
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Solutions designed for performance, growth, and clarity
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-300">
            From strategy to delivery, we help companies build polished digital
            experiences and reliable business systems that are ready for scale.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-xl border border-white/10 bg-white/5 p-6 shadow-md"
              >
                <div className="h-14 w-14 rounded-2xl bg-white/10" />
                <div className="mt-6 h-6 w-2/3 rounded-full bg-white/10" />
                <div className="mt-4 space-y-3">
                  <div className="h-4 rounded-full bg-white/10" />
                  <div className="h-4 rounded-full bg-white/10" />
                  <div className="h-4 w-5/6 rounded-full bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mx-auto mt-14 max-w-3xl rounded-xl border border-rose-400/30 bg-rose-500/10 px-6 py-5 text-center text-sm text-rose-100">
            {error}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 shadow-md shadow-slate-950/20 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-950/30"
              >
                <div className="flex items-center gap-4">
                  {isImageIcon(service.icon) ? (
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="h-14 w-14 rounded-2xl border border-white/10 bg-white object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-sm font-bold tracking-[0.24em] text-cyan-100 shadow-inner">
                      {getIconLabel(service)}
                    </div>
                  )}

                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-300/30 to-transparent" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white transition duration-300 group-hover:text-cyan-200">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ServicesSection
