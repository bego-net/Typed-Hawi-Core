import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineArrowLeft } from 'react-icons/hi'
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
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="text-slate-500 animate-pulse">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (error || !service) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 dark:bg-slate-950">
        <div className="text-6xl">😕</div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Service Not Found</h2>
          <p className="mt-2 text-slate-500">{error || 'The service you are looking for does not exist.'}</p>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          <HiOutlineArrowLeft /> Back to Services
        </Link>
      </div>
    )
  }

  // Map backend fields to the user's requested naming
  const title = service.title
  const short_description = service.description
  const full_content = service.content

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 py-16 dark:bg-slate-950 sm:py-24 lg:py-32">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <nav className="mb-8 flex justify-center items-center gap-2 text-sm text-slate-400">
              <Link to="/" className="transition hover:text-white">Home</Link>
              <span>/</span>
              <Link to="/services" className="transition hover:text-white">Services</Link>
              <span>/</span>
              <span className="text-primary-light font-medium">{title}</span>
            </nav>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-slate-300">
              {short_description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Service Image if exists */}
          {service.image_url && (
            <div className="mb-10 overflow-hidden rounded-3xl shadow-2xl">
              <img src={service.image_url} alt={title} className="w-full object-cover" />
            </div>
          )}

          {/* Full Content Card */}
          <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800 sm:p-12">
            <div className="prose prose-slate max-w-none dark:prose-invert 
              prose-headings:font-bold prose-headings:tracking-tight 
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
              prose-p:text-lg prose-p:leading-relaxed prose-p:text-slate-600 dark:prose-p:text-slate-400
              prose-li:text-lg prose-li:text-slate-600 dark:prose-li:text-slate-400
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl"
            >
              {full_content ? (
                <div dangerouslySetInnerHTML={{ __html: full_content }} />
              ) : (
                <p className="text-lg">{short_description}</p>
              )}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-20 flex flex-col items-center justify-center border-t border-slate-100 pt-12 dark:border-slate-800 sm:flex-row sm:gap-6">
            <Link
              to="/contact"
              className="w-full rounded-2xl bg-primary px-8 py-4 text-center text-lg font-bold text-white shadow-xl shadow-primary/20 transition hover:-translate-y-1 hover:bg-primary-dark sm:w-auto"
            >
              Get Started with {title}
            </Link>
            <Link
              to="/services"
              className="mt-4 flex items-center gap-2 font-semibold text-slate-600 transition hover:text-primary dark:text-slate-400 sm:mt-0"
            >
              <HiOutlineArrowLeft /> View Other Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ServiceDetails
