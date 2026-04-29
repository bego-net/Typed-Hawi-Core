import { useEffect, useState } from 'react'
import api from '../api/axios'
import { isAdminLoggedIn } from '../auth/token'
import ServiceForm from './ServiceForm'
import Card from './admin/Card'
import Button from './admin/Button'
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
      <Card className="p-6 text-slate-600 dark:text-slate-400">
        Loading services...
      </Card>
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
        <p className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Available Services <span className="text-sm font-normal text-slate-500">({services.length})</span>
          </h2>
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedService(null)
              void fetchServices()
            }}
          >
            Refresh
          </Button>
        </div>

        {services.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-12 text-center text-slate-500">
            No services available at the moment.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 p-5 transition-all hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-900"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  {isImageIcon(service.icon) ? (
                    <img
                      src={service.icon ?? ''}
                      alt={service.title}
                      className="h-14 w-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 object-cover"
                    />
                  ) : (
                    <div className="inline-flex min-h-14 min-w-14 items-center justify-center rounded-xl border border-cyan-200 dark:border-cyan-900/50 bg-cyan-50 dark:bg-cyan-900/20 px-4 text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                      {service.icon ?? ''}
                    </div>
                  )}

                  {canEdit ? (
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(service)}
                        className="px-3 py-1.5 text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => void handleDelete(service.id)}
                        disabled={deletingId === service.id}
                        className="px-3 py-1.5 text-xs"
                      >
                        {deletingId === service.id ? '...' : 'Delete'}
                      </Button>
                    </div>
                  ) : null}
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </Card>
    </section>
  )
}

export default ServiceList
