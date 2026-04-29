import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import api from '../../api/axios'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import Input from '../../components/admin/Input'
import type { Testimonial } from '../../services/api'

export default function TestimonialsDashboard() {
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Manage Testimonials
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Add, edit, and remove client testimonials with person photos.
        </p>
      </div>

      {/* ── Form ─────────────────────────────── */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {selected ? 'Edit Testimonial' : 'Add New Testimonial'}
          </h2>
          {selected && (
            <Button variant="outline" onClick={clearForm}>
              Cancel
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Person's full name"
                required
              />
            </div>
            <div className="sm:col-span-1">
              <Input
                label="Role / Position"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. CEO, Marketing Director"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <Input
                label="Message / Quote"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What did this client say?"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="testimonial-image" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Person Photo {!selected && <span className="text-red-500">*</span>}
              </label>
              <input
                ref={fileInputRef}
                id="testimonial-image"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleImageChange}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151515] px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-50 dark:file:bg-cyan-900/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 dark:file:text-cyan-400 hover:file:bg-cyan-100 dark:hover:file:bg-cyan-900/50"
                required={!selected}
              />
              {imagePreview && (
                <div className="mt-3">
                  <img src={imagePreview} alt="Preview" className="h-20 w-20 rounded-full border border-slate-200 dark:border-slate-700 object-cover shadow-sm" />
                </div>
              )}
            </div>
          </div>

          {formError && (
            <p className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">{formError}</p>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : selected ? 'Update Testimonial' : 'Create Testimonial'}
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
            All Testimonials <span className="text-sm font-normal text-slate-500">({testimonials.length})</span>
          </h2>
          <Button variant="ghost" onClick={() => void fetchTestimonials()}>
            Refresh
          </Button>
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-slate-500">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-12 text-center text-slate-500">
            No testimonials yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((t) => (
              <article key={t.id} className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 p-5 transition-all hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-900">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 object-cover" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-200 dark:border-cyan-900/50 bg-cyan-50 dark:bg-cyan-900/20 text-lg font-bold text-cyan-700 dark:text-cyan-400">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{t.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                    <Button variant="outline" onClick={() => handleEdit(t)} className="px-3 py-1.5 text-xs">Edit</Button>
                    <Button variant="danger" onClick={() => void handleDelete(t.id)} disabled={deletingId === t.id} className="px-3 py-1.5 text-xs">
                      {deletingId === t.id ? '...' : 'Delete'}
                    </Button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 italic">"{t.message}"</p>
              </article>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
