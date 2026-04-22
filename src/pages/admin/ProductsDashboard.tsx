import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { removeToken } from '../../auth/token'
import type { Product } from '../../services/api'

export default function ProductsDashboard() {
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Fetch ──────────────────────────────────────
  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.get<Product[]>('/products')
      setProducts(res.data)
    } catch {
      setError('Unable to load products.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchProducts()
  }, [])

  // ── Form helpers ───────────────────────────────
  const clearForm = () => {
    setSelectedProduct(null)
    setTitle('')
    setDescription('')
    setImageFile(null)
    setImagePreview(null)
    setFormError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setTitle(product.title)
    setDescription(product.description)
    setImageFile(null)
    setImagePreview(product.image)
    setFormError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // ── Submit ─────────────────────────────────────
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    if (imageFile) formData.append('image', imageFile)

    try {
      setSubmitting(true)
      setFormError(null)

      if (selectedProduct) {
        await api.post(`/admin/products/${selectedProduct.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await api.post('/admin/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }

      clearForm()
      await fetchProducts()
    } catch {
      setFormError('Unable to save product.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Delete ─────────────────────────────────────
  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id)
      setError(null)
      await api.delete(`/admin/products/${id}`)
      if (selectedProduct?.id === id) clearForm()
      await fetchProducts()
    } catch {
      setError('Unable to delete this product.')
    } finally {
      setDeletingId(null)
    }
  }

  // ── Logout ─────────────────────────────────────
  const logout = async () => {
    try {
      setLoggingOut(true)
      await api.post('/admin/logout')
    } catch {
      // ignore
    } finally {
      removeToken()
      setLoggingOut(false)
      navigate('/admin/login', { replace: true })
    }
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Manage Products
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Create, update, and remove products displayed on the website.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate('/admin/services')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Services</button>
            <button type="button" onClick={() => navigate('/admin/testimonials')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Testimonials</button>
            <button type="button" onClick={() => navigate('/admin/partners')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Partners</button>
            <button type="button" onClick={() => navigate('/admin/contacts')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Contacts</button>
            <button type="button" onClick={() => void logout()} disabled={loggingOut} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">
              {loggingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>

        {/* ── Form ─────────────────────────────── */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Product Form</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            {selectedProduct && (
              <button type="button" onClick={clearForm} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="product-title" className="mb-2 block text-sm font-medium text-slate-700">Title</label>
              <input id="product-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product name" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" required />
            </div>

            <div>
              <label htmlFor="product-description" className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea id="product-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description" rows={4} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" required />
            </div>

            <div>
              <label htmlFor="product-image" className="mb-2 block text-sm font-medium text-slate-700">
                Image {!selectedProduct && <span className="text-red-500">*</span>}
              </label>
              <input ref={fileInputRef} id="product-image" type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleImageChange} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 hover:file:bg-cyan-100" required={!selectedProduct} />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="h-32 w-auto rounded-2xl border border-slate-200 object-cover shadow-sm" />
                </div>
              )}
            </div>

            {formError && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</p>
            )}

            <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">
              {submitting ? 'Saving...' : selectedProduct ? 'Update Product' : 'Create Product'}
            </button>
          </form>
        </section>

        {/* ── List ─────────────────────────────── */}
        {error && (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        )}

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Product List</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                All Products <span className="text-sm font-normal text-slate-400">({products.length})</span>
              </h2>
            </div>
            <button type="button" onClick={() => void fetchProducts()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="py-8 text-center text-sm text-slate-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500">No products yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {products.map((product) => (
                <article key={product.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan-200 hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    {product.image ? (
                      <img src={product.image} alt={product.title} className="h-14 w-14 rounded-2xl border border-slate-200 bg-white object-cover" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 text-sm font-semibold text-cyan-700">
                        IMG
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleEdit(product)} className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">Edit</button>
                      <button type="button" onClick={() => void handleDelete(product.id)} disabled={deletingId === product.id} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70">
                        {deletingId === product.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{product.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 line-clamp-3">{product.description}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
