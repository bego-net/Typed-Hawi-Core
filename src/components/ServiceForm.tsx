import {
  useEffect,
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import api from '../api/axios'
import type { Service } from '../types/service'
import Card from './admin/Card'
import Button from './admin/Button'
import Input from './admin/Input'

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
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          {selectedService ? 'Edit Service' : 'Add New Service'}
        </h2>

        {selectedService ? (
          <Button
            variant="outline"
            onClick={() => {
              clearForm()
              onCancelEdit()
            }}
          >
            Cancel
          </Button>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <Input
              label="Title"
              id="title"
              name="title"
              value={title}
              onChange={handleInputChange}
              placeholder="Enter service title"
              required
            />
          </div>

          {/* Short Description */}
          <div className="md:col-span-2">
            <Input
              label="Short Description"
              id="description"
              name="description"
              multiline
              value={description}
              onChange={handleInputChange}
              placeholder="Brief description shown on cards"
              rows={3}
              required
            />
          </div>

          {/* Full Content (HTML) */}
          <div className="md:col-span-2">
            <label htmlFor="content" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Full Content <span className="text-slate-400">(HTML supported)</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={handleInputChange}
              placeholder="<h2>About this service</h2><p>Detailed description...</p>"
              rows={8}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151515] px-4 py-2.5 font-mono text-sm text-slate-900 dark:text-white outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:focus:ring-cyan-500/20"
            />
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              You can use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, etc.
            </p>
          </div>

          {/* Icon */}
          <div className="md:col-span-1">
            <Input
              label="Icon"
              id="icon"
              name="icon"
              value={icon}
              onChange={handleInputChange}
              placeholder="Enter icon text or image URL"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-1">
            <label htmlFor="image" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Service Image
            </label>
            <input
              ref={fileInputRef}
              id="image"
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151515] px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-50 dark:file:bg-cyan-900/30 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-700 dark:file:text-cyan-400 hover:file:bg-cyan-100 dark:hover:file:bg-cyan-900/50"
            />
            {imagePreview && (
              <div className="mt-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-32 w-auto rounded-xl border border-slate-200 dark:border-slate-700 object-cover shadow-sm"
                />
              </div>
            )}
          </div>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        ) : null}

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={submitting}>
            {submitting
              ? 'Saving...'
              : selectedService
                ? 'Update Service'
                : 'Create Service'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default ServiceForm
