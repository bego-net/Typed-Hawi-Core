import { useEffect, useState, useRef, type ChangeEvent, type FormEvent } from 'react'
import api from '../../api/axios'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import Input from '../../components/admin/Input'
import type { Partner } from '../../services/api'

export default function PartnersDashboard() {
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Manage Partners
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Add, edit, and remove partner logos displayed on the website.
        </p>
      </div>

      {/* ── Form ─────────────────────────────── */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {selected ? 'Edit Partner' : 'Add New Partner'}
          </h2>
          {selected && (
            <Button variant="outline" onClick={clearForm}>
              Cancel
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Company Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Partner company name"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="partner-logo" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Company Logo {!selected && <span className="text-red-500">*</span>}
              </label>
              <input
                ref={fileInputRef}
                id="partner-logo"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleLogoChange}
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151515] px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-50 dark:file:bg-cyan-900/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 dark:file:text-cyan-400 hover:file:bg-cyan-100 dark:hover:file:bg-cyan-900/50"
                required={!selected}
              />
              {logoPreview && (
                <div className="mt-3">
                  <img src={logoPreview} alt="Preview" className="h-16 w-auto rounded-xl border border-slate-200 dark:border-slate-700 object-contain bg-white dark:bg-[#151515] p-2 shadow-sm" />
                </div>
              )}
            </div>
          </div>

          {formError && (
            <p className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">{formError}</p>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : selected ? 'Update Partner' : 'Create Partner'}
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
            All Partners <span className="text-sm font-normal text-slate-500">({partners.length})</span>
          </h2>
          <Button variant="ghost" onClick={() => void fetchPartners()}>
            Refresh
          </Button>
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-slate-500">Loading partners...</p>
        ) : partners.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-12 text-center text-slate-500">
            No partners yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <article key={partner.id} className="group relative flex flex-col rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 p-5 transition-all hover:shadow-md hover:border-cyan-200 dark:hover:border-cyan-900">
                <div className="mb-4 flex items-center justify-between gap-4">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} className="h-12 w-auto max-w-[120px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white object-contain p-1.5" />
                  ) : (
                    <div className="flex h-12 items-center justify-center rounded-lg border border-cyan-200 dark:border-cyan-900/50 bg-cyan-50 dark:bg-cyan-900/20 px-3 text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                      LOGO
                    </div>
                  )}
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
                    <Button variant="outline" onClick={() => handleEdit(partner)} className="px-3 py-1.5 text-xs">Edit</Button>
                    <Button variant="danger" onClick={() => void handleDelete(partner.id)} disabled={deletingId === partner.id} className="px-3 py-1.5 text-xs">
                      {deletingId === partner.id ? '...' : 'Delete'}
                    </Button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{partner.name}</h3>
              </article>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
