import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'
import ServiceCard from '../components/ServiceCard'
import Section from '../components/Section'
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
        setServices(res.data.data)
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Page Header */}
      <div className="bg-slate-900 py-16 dark:bg-slate-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Discover our range of professional software solutions designed to help your business grow and thrive in the digital age.
            </p>
          </motion.div>
        </div>
      </div>

      <Section background="alt">
        {loading ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            <p className="text-slate-500 animate-pulse">Loading amazing services...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-8 text-center dark:border-red-900/30 dark:bg-red-900/10">
            <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-sm font-semibold text-red-700 hover:underline dark:text-red-300"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard
                  title={service.title}
                  slug={service.slug}
                  short_description={service.description}
                  icon={service.icon ?? '✨'}
                  image_url={service.image_url}
                />
              </motion.div>
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}

export default Services