import { useEffect, useState } from 'react'
import api from '../api/axios'
import ServiceCard from '../components/ServiceCard'
import type { Service } from '../types/service'

type ServiceResponse = Service[] | { data: Service[] }

function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await api.get<ServiceResponse>('/services')
        const serviceData = Array.isArray(res.data) ? res.data : res.data.data
        setServices(serviceData)
      } catch {
        setError('Unable to load services right now. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    void run()
  }, [])

  return (
    <div className="min-h-[60vh] bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-rose-700">
            Services Highlights
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Digital services built to move brands and businesses forward
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            We combine strategy, design, and software engineering to create
            practical solutions that look polished and perform reliably.
          </p>
        </div>

        {loading ? (
          <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
            Loading services...
          </div>
        ) : error ? (
          <div className="mt-14 rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon ?? ''}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Services
