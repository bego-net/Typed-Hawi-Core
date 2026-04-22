import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { removeToken } from '../../auth/token'
import type { Testimonial } from '../../services/api'

export default function TestimonialsDashboard() {
  const navigate = useNavigate()

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [selected, setSelected] = useState<Testimonial | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Fetch ──────────────────────────────────────
  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.get<Testimonial[]>('/testimonials')
      setTestimonials(res.data)
    } catch {
      setError('Unable to load testimonials.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchTestimonials()
  }, [])

  // ── Form helpers ───────────────────────────────
  const clearForm = () => {
    setSelected(null)
    setName('')
    setRole('')
    setMessage('')
    setImageFile(null)
    setImagePreview(null)
    setFormError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleEdit = (testimonial: Testimonial) => {
    setSelected(testimonial)
    setName(testimonial.name)
    setRole(testimonial.role)
    setMessage(testimonial.message)
    setImageFile(null)
    setImagePreview(testimonial.image)
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
    formData.append('name', name)
    formData.append('role', role)
    formData.append('message', message)
    if (imageFile) formData.append('image', imageFile)

    try {
      setSubmitting(true)
      setFormError(null)

      if (selected) {
        await api.post(`/admin/testimonials/${selected.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await api.post('/admin/testimonials', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }

      clearForm()
      await fetchTestimonials()
    } catch {
      setFormError('Unable to save testimonial.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Delete ─────────────────────────────────────
  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id)
      setError(null)
      await api.delete(`/admin/testimonials/${id}`)
      if (selected?.id === id) clearForm()
      await fetchTestimonials()
    } catch {
      setError('Unable to delete this testimonial.')
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
              Manage Testimonials
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Add, edit, and remove client testimonials with person photos.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate('/admin/services')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Services</button>
            <button type="button" onClick={() => navigate('/admin/products')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Products</button>
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Testimonial Form</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {selected ? 'Edit Testimonial' : 'Add New Testimonial'}
              </h2>
            </div>
            {selected && (
              <button type="button" onClick={clearForm} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="testimonial-name" className="mb-2 block text-sm font-medium text-slate-700">Name</label>
                <input id="testimonial-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Person's full name" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" required />
              </div>
              <div>
                <label htmlFor="testimonial-role" className="mb-2 block text-sm font-medium text-slate-700">Role / Position</label>
                <input id="testimonial-role" type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. CEO, Marketing Director" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" required />
              </div>
            </div>

            <div>
              <label htmlFor="testimonial-message" className="mb-2 block text-sm font-medium text-slate-700">Message / Quote</label>
              <textarea id="testimonial-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What did this client say?" rows={4} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" required />
            </div>

            <div>
              <label htmlFor="testimonial-image" className="mb-2 block text-sm font-medium text-slate-700">
                Person Photo {!selected && <span className="text-red-500">*</span>}
              </label>
              <input ref={fileInputRef} id="testimonial-image" type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleImageChange} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 hover:file:bg-cyan-100" required={!selected} />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-full border border-slate-200 object-cover shadow-sm" />
                </div>
              )}
            </div>

            {formError && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</p>
            )}

            <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">
              {submitting ? 'Saving...' : selected ? 'Update Testimonial' : 'Create Testimonial'}
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Testimonial List</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                All Testimonials <span className="text-sm font-normal text-slate-400">({testimonials.length})</span>
              </h2>
            </div>
            <button type="button" onClick={() => void fetchTestimonials()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="py-8 text-center text-sm text-slate-500">Loading testimonials...</p>
          ) : testimonials.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500">No testimonials yet.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {testimonials.map((t) => (
                <article key={t.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan-200 hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {t.image ? (
                        <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full border border-slate-200 bg-white object-cover" />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 text-lg font-bold text-cyan-700">
                          {t.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{t.name}</h3>
                        <p className="text-sm text-slate-500">{t.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleEdit(t)} className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">Edit</button>
                      <button type="button" onClick={() => void handleDelete(t.id)} disabled={deletingId === t.id} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70">
                        {deletingId === t.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-slate-600 italic">"{t.message}"</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
