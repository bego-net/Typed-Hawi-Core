import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { removeToken } from '../../auth/token'
import type { Partner } from '../../services/api'

export default function PartnersDashboard() {
  const navigate = useNavigate()

  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [selected, setSelected] = useState<Partner | null>(null)
  const [name, setName] = useState('')
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [loggingOut, setLoggingOut] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Fetch ──────────────────────────────────────
  const fetchPartners = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.get<Partner[]>('/partners')
      setPartners(res.data)
    } catch {
      setError('Unable to load partners.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchPartners()
  }, [])

  // ── Form helpers ───────────────────────────────
  const clearForm = () => {
    setSelected(null)
    setName('')
    setLogoFile(null)
    setLogoPreview(null)
    setFormError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleEdit = (partner: Partner) => {
    setSelected(partner)
    setName(partner.name)
    setLogoFile(null)
    setLogoPreview(partner.logo)
    setFormError(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  // ── Submit ─────────────────────────────────────
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    if (logoFile) formData.append('logo', logoFile)

    try {
      setSubmitting(true)
      setFormError(null)

      if (selected) {
        await api.post(`/admin/partners/${selected.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await api.post('/admin/partners', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }

      clearForm()
      await fetchPartners()
    } catch {
      setFormError('Unable to save partner.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Delete ─────────────────────────────────────
  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id)
      setError(null)
      await api.delete(`/admin/partners/${id}`)
      if (selected?.id === id) clearForm()
      await fetchPartners()
    } catch {
      setError('Unable to delete this partner.')
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
              Manage Partners
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Add, edit, and remove partner logos displayed on the website.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate('/admin/services')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Services</button>
            <button type="button" onClick={() => navigate('/admin/products')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Products</button>
            <button type="button" onClick={() => navigate('/admin/testimonials')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Testimonials</button>
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Partner Form</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {selected ? 'Edit Partner' : 'Add New Partner'}
              </h2>
            </div>
            {selected && (
              <button type="button" onClick={clearForm} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="partner-name" className="mb-2 block text-sm font-medium text-slate-700">Company Name</label>
              <input id="partner-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Partner company name" className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100" required />
            </div>

            <div>
              <label htmlFor="partner-logo" className="mb-2 block text-sm font-medium text-slate-700">
                Company Logo {!selected && <span className="text-red-500">*</span>}
              </label>
              <input ref={fileInputRef} id="partner-logo" type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleLogoChange} className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 hover:file:bg-cyan-100" required={!selected} />
              {logoPreview && (
                <div className="mt-3">
                  <img src={logoPreview} alt="Preview" className="h-16 w-auto rounded-xl border border-slate-200 object-contain bg-white p-2 shadow-sm" />
                </div>
              )}
            </div>

            {formError && (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formError}</p>
            )}

            <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">
              {submitting ? 'Saving...' : selected ? 'Update Partner' : 'Create Partner'}
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
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">Partner List</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                All Partners <span className="text-sm font-normal text-slate-400">({partners.length})</span>
              </h2>
            </div>
            <button type="button" onClick={() => void fetchPartners()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
              Refresh
            </button>
          </div>

          {loading ? (
            <p className="py-8 text-center text-sm text-slate-500">Loading partners...</p>
          ) : partners.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500">No partners yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <article key={partner.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-cyan-200 hover:shadow-md">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    {partner.logo ? (
                      <img src={partner.logo} alt={partner.name} className="h-12 w-auto max-w-[120px] rounded-lg border border-slate-200 bg-white object-contain p-1.5" />
                    ) : (
                      <div className="flex h-12 items-center justify-center rounded-lg border border-cyan-200 bg-cyan-50 px-3 text-sm font-semibold text-cyan-700">
                        LOGO
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button type="button" onClick={() => handleEdit(partner)} className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">Edit</button>
                      <button type="button" onClick={() => void handleDelete(partner.id)} disabled={deletingId === partner.id} className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70">
                        {deletingId === partner.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{partner.name}</h3>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
