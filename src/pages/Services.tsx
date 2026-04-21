import { useEffect, useState } from 'react'
import api from '../api/axios'
import ServiceCard from '../components/ServiceCard'
import type { Service } from '../types/service'

type ApiResponse = {
  success: boolean
  message: string
  data: Service[]
}

function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await api.get<ApiResponse>('/services')

        console.log(res.data) // 👈 check this in browser

        setServices(res.data.data) // ✅ correct for your backend
      } catch (err) {
        console.error(err)
        setError('Unable to load services right now. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [])

  return (
    <div className="min-h-[60vh] bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-6 text-3xl font-bold text-slate-950 sm:text-4xl">
            Our Services
          </h2>
        </div>

        {loading ? (
          <div className="mt-14">Loading services...</div>
        ) : error ? (
          <div className="mt-14 text-red-600">{error}</div>
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