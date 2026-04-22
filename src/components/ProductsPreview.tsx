import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts, type Product } from '../services/api'

const DEFAULT_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" fill="%23cbd5e1"%3E%3Crect width="400" height="225" rx="8"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%2394a3b8"%3ENo Image%3C/text%3E%3C/svg%3E'

function ProductsPreview() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.slice(0, 3)))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-y-6">
          <div className="max-w-2xl">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Our Products</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Platforms ready for scale
            </p>
          </div>
          <div>
            <Link
              to="/products"
              className="inline-flex rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>

        {loading && (
          <p className="mt-16 text-center text-slate-500">Loading products...</p>
        )}

        {error && (
          <p className="mt-16 text-center text-red-500">{error}</p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="mt-16 text-center text-slate-500">No products yet.</p>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.image || DEFAULT_IMAGE}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMAGE }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold leading-6 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="mt-3 flex-auto text-sm leading-6 text-slate-600 line-clamp-3">
                    {product.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductsPreview
