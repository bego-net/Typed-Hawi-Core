import { useEffect, useState } from 'react'
import { getTestimonials, type Testimonial } from '../services/api'

const DEFAULT_AVATAR = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="%23e2e8f0"%3E%3Ccircle cx="28" cy="28" r="28"/%3E%3Ctext x="50%25" y="54%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" fill="%2394a3b8"%3E%3F%3C/text%3E%3C/svg%3E'

function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTestimonials()
      .then((data) => setTestimonials(data.slice(0, 3)))
      .catch(() => setError('Failed to load testimonials'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by businesses everywhere
          </p>
        </div>

        {loading && (
          <p className="mt-16 text-center text-slate-500">Loading testimonials...</p>
        )}

        {error && (
          <p className="mt-16 text-center text-red-500">{error}</p>
        )}

        {!loading && !error && testimonials.length === 0 && (
          <p className="mt-16 text-center text-slate-500">No testimonials yet.</p>
        )}

        {!loading && !error && testimonials.length > 0 && (
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl bg-slate-50 p-8 sm:p-10 ring-1 ring-slate-200 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <blockquote className="text-lg leading-8 text-slate-900">
                    <p>"{t.message}"</p>
                  </blockquote>

                  <div className="mt-6 flex items-center gap-x-4">
                    <img
                      src={t.image || DEFAULT_AVATAR}
                      alt={t.name}
                      className="h-14 w-14 rounded-full object-cover bg-slate-200 shadow-sm"
                      onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_AVATAR }}
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{t.name}</div>
                      <div className="text-sm text-slate-600">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
