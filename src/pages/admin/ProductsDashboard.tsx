import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import api from '../../api/axios'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import Input from '../../components/admin/Input'
import type { Product } from '../../services/api'

export default function ProductsDashboard() {
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Manage Products
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Create, update, and remove products displayed on the website.
        </p>
      </div>

      {/* ── Form ─────────────────────────────── */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {selectedProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          {selectedProduct && (
            <Button variant="outline" onClick={clearForm}>
              Cancel
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product name"
                required
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Product description"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="product-image" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Image {!selectedProduct && <span className="text-red-500">*</span>}
              </label>
              <input
                ref={fileInputRef}
                id="product-image"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleImageChange}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151515] px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-50 dark:file:bg-cyan-900/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 dark:file:text-cyan-400 hover:file:bg-cyan-100 dark:hover:file:bg-cyan-900/50"
                required={!selectedProduct}
              />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="h-32 w-auto rounded-xl border border-slate-200 dark:border-slate-700 object-cover shadow-sm" />
                </div>
              )}
            </div>
          </div>

          {formError && (
            <p className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">{formError}</p>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : selectedProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Card>

      {/* ── List ─────────────────────────────── */}
      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">{error}</p>
      )}

      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            All Products <span className="text-sm font-normal text-slate-500">({products.length})</span>
          </h2>
          <Button variant="ghost" onClick={() => void fetchProducts()}>
            Refresh
          </Button>
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-slate-500">Loading products...</p>
        ) : products.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-12 text-center text-slate-500">
            No products yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 p-5 transition-all hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-900">
                <div className="mb-4 flex items-start justify-between gap-4">
                  {product.image ? (
                    <img src={product.image} alt={product.title} className="h-16 w-16 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 object-cover" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-cyan-200 dark:border-cyan-900/50 bg-cyan-50 dark:bg-cyan-900/20 text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                      NO IMG
                    </div>
                  )}
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                    <Button variant="outline" onClick={() => handleEdit(product)} className="px-3 py-1.5 text-xs">Edit</Button>
                    <Button variant="danger" onClick={() => void handleDelete(product.id)} disabled={deletingId === product.id} className="px-3 py-1.5 text-xs">
                      {deletingId === product.id ? '...' : 'Delete'}
                    </Button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{product.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400 line-clamp-3">{product.description}</p>
              </article>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
