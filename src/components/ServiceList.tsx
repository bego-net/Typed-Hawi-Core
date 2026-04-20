import { useEffect, useState } from 'react'
import api from '../api/axios'
import { isAdminLoggedIn } from '../auth/token'
import ServiceForm from './ServiceForm'
import type { Service } from '../types/service'

type ServiceResponse = Service[] | { data: Service[] }

const isImageIcon = (icon: string | null) => {
  if (!icon) return false
  return (
    icon.startsWith('http://') ||
    icon.startsWith('https://') ||
    icon.startsWith('/') ||
    icon.startsWith('data:image')
  )
}

function ServiceList() {
  const canEdit = isAdminLoggedIn()
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

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
      setError('Unable to load services right now. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchServices()
  }, [])

  const handleDelete = async (serviceId: number) => {
    try {
      setDeletingId(serviceId)
      setError(null)

      await api.delete(`/services/${serviceId}`)

      if (selectedService?.id === serviceId) {
        setSelectedService(null)
      }

      await fetchServices()
    } catch {
      setError('Unable to delete this service right now.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        Loading services...
      </div>
    )
  }

  return (
    <section className="space-y-6">
      {canEdit ? (
        <ServiceForm
          selectedService={selectedService}
          onSuccess={fetchServices}
          onCancelEdit={() => setSelectedService(null)}
        />
      ) : null}

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Service List
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Available Services
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedService(null)
              void fetchServices()
            }}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Refresh
          </button>
        </div>

        {services.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500">
            No services available at the moment.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan-200 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  {isImageIcon(service.icon) ? (
                    <img
                      src={service.icon ?? ''}
                      alt={service.title}
                      className="h-14 w-14 rounded-2xl border border-slate-200 bg-white object-cover"
                    />
                  ) : (
                    <div className="inline-flex min-h-14 min-w-14 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 px-4 text-sm font-semibold text-cyan-700">
                      {service.icon ?? ''}
                    </div>
                  )}

                  {canEdit ? (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(service)}
                        className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(service.id)}
                        disabled={deletingId === service.id}
                        className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {deletingId === service.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  ) : null}
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
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

export default ServiceList
