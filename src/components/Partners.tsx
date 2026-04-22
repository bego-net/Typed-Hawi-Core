import { useEffect, useState } from 'react'
import { getPartners, type Partner } from '../services/api'

const DEFAULT_LOGO = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="48" fill="%23e2e8f0"%3E%3Crect width="120" height="48" rx="6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%2394a3b8"%3ELogo%3C/text%3E%3C/svg%3E'

function Partners() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPartners()
      .then((data) => setPartners(data))
      .catch(() => setError('Failed to load partners'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold leading-8 text-slate-900">
          Our Trusted Partners
        </h2>

        {loading && (
          <p className="mt-10 text-center text-slate-500">Loading partners...</p>
        )}

        {error && (
          <p className="mt-10 text-center text-red-500">{error}</p>
        )}

        {!loading && !error && partners.length === 0 && (
          <p className="mt-10 text-center text-slate-500">No partners yet.</p>
        )}

        {!loading && !error && partners.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="col-span-1 flex justify-center p-4 transition-all duration-300 hover:scale-110"
                title={partner.name}
              >
                <img
                  src={partner.logo || DEFAULT_LOGO}
                  alt={partner.name}
                  className="max-h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                  onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_LOGO }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Partners
