import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import api from '../api/axios'
import type { Service } from '../types/service'

interface ServiceFormProps {
  selectedService: Service | null
  onSuccess: () => Promise<void> | void
  onCancelEdit: () => void
}

function ServiceForm({
  selectedService,
  onSuccess,
  onCancelEdit,
}: ServiceFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (selectedService) {
      setTitle(selectedService.title)
      setDescription(selectedService.description)
      setIcon(selectedService.icon ?? '')
      return
    }

    setTitle('')
    setDescription('')
    setIcon('')
  }, [selectedService])

  const clearForm = () => {
    setTitle('')
    setDescription('')
    setIcon('')
    setError(null)
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    if (name === 'title') {
      setTitle(value)
      return
    }

    if (name === 'description') {
      setDescription(value)
      return
    }

    setIcon(value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const payload = {
      title,
      description,
      icon,
    }

    try {
      setSubmitting(true)
      setError(null)

      if (selectedService) {
        await api.put(`/services/${selectedService.id}`, payload)
      } else {
        await api.post('/services', payload)
      }

      await onSuccess()
      clearForm()
      onCancelEdit()
    } catch {
      setError('Unable to save this service right now.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Service Form
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">
            {selectedService ? 'Edit Service' : 'Add New Service'}
          </h2>
        </div>

        {selectedService ? (
          <button
            type="button"
            onClick={() => {
              clearForm()
              onCancelEdit()
            }}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Cancel
          </button>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={handleInputChange}
            placeholder="Enter service title"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="Enter service description"
            rows={4}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            required
          />
        </div>

        <div>
          <label
            htmlFor="icon"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Icon
          </label>
          <input
            id="icon"
            name="icon"
            type="text"
            value={icon}
            onChange={handleInputChange}
            placeholder="Enter icon text or image URL"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            required
          />
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting
            ? 'Saving...'
            : selectedService
              ? 'Update Service'
              : 'Create Service'}
        </button>
      </form>
    </section>
  )
}

export default ServiceForm
