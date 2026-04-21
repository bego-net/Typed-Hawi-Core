import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import type { Service } from '../types/service'

type ApiResponse = {
  success: boolean
  message: string
  data: Service
}

function ServiceDetails() {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return

    const fetchService = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await api.get<ApiResponse>(`/services/slug/${slug}`)
        setService(res.data.data)
      } catch {
        setError('Service not found or could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    void fetchService()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600" />
          <p className="text-sm text-slate-500">Loading service…</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-slate-50">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-3xl">
          😕
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">Service Not Found</h2>
          <p className="mt-2 text-sm text-slate-500">{error || 'The service you are looking for does not exist.'}</p>
        </div>
        <Link
          to="/services"
          className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          ← Back to Services
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-[60vh] bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,182,212,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <span className="text-slate-600">/</span>
            <Link to="/services" className="transition hover:text-white">Services</Link>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400">{service.title}</span>
          </nav>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
            {/* Icon */}
            {service.icon && (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-orange-400 text-2xl font-bold text-white shadow-lg shadow-rose-500/30">
                {service.icon}
              </div>
            )}

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Service Image */}
        {service.image_url && (
          <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200 shadow-lg shadow-slate-200/50">
            <img
              src={service.image_url}
              alt={service.title}
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Full Content (HTML) */}
        {service.content ? (
          <div
            className="service-content prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:leading-8 prose-p:text-slate-700 prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-ul:text-slate-700 prose-ol:text-slate-700 prose-li:leading-8"
            dangerouslySetInnerHTML={{ __html: service.content }}
          />
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-base leading-8 text-slate-700 whitespace-pre-wrap">
              {service.description}
            </p>
          </div>
        )}

        {/* Back link */}
        <div className="mt-12 flex gap-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl"
          >
            ← All Services
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-6 py-3 text-sm font-semibold text-cyan-700 transition hover:-translate-y-0.5 hover:bg-cyan-100 hover:shadow-lg"
          >
            Get in Touch →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails
