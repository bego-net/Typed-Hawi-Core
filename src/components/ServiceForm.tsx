import {
  useEffect,
  useState,
  useRef,
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
  const [content, setContent] = useState('')
  const [icon, setIcon] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedService) {
      setTitle(selectedService.title)
      setDescription(selectedService.description)
      setContent(selectedService.content ?? '')
      setIcon(selectedService.icon ?? '')
      setImagePreview(selectedService.image_url ?? null)
      setImageFile(null)
      return
    }

    clearForm()
  }, [selectedService])

  const clearForm = () => {
    setTitle('')
    setDescription('')
    setContent('')
    setIcon('')
    setImageFile(null)
    setImagePreview(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'title') setTitle(value)
    else if (name === 'description') setDescription(value)
    else if (name === 'content') setContent(value)
    else if (name === 'icon') setIcon(value)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('content', content)
    formData.append('icon', icon)
    if (imageFile) {
      formData.append('image', imageFile)
    }

    try {
      setSubmitting(true)
      setError(null)

      if (selectedService) {
        // Use POST for update (multipart doesn't support PUT)
        await api.post(`/services/${selectedService.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      } else {
        await api.post('/services', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
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
        {/* Title */}
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700">
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

        {/* Short Description */}
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-slate-700">
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            placeholder="Brief description shown on cards"
            rows={3}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            required
          />
        </div>

        {/* Full Content (HTML) */}
        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-medium text-slate-700">
            Full Content <span className="text-slate-400">(HTML supported)</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={handleInputChange}
            placeholder="<h2>About this service</h2><p>Detailed description...</p>"
            rows={8}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 font-mono text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.
          </p>
        </div>

        {/* Icon */}
        <div>
          <label htmlFor="icon" className="mb-2 block text-sm font-medium text-slate-700">
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
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="mb-2 block text-sm font-medium text-slate-700">
            Service Image
          </label>
          <input
            ref={fileInputRef}
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            onChange={handleImageChange}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 hover:file:bg-cyan-100"
          />
          {imagePreview && (
            <div className="mt-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-auto rounded-2xl border border-slate-200 object-cover shadow-sm"
              />
            </div>
          )}
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
