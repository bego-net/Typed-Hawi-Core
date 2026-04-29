import { useState } from 'react'
import type { FormEvent } from 'react'
import api from '../api/axios'
import SocialLinks from './SocialLinks'

const SUBJECT_OPTIONS = [
  'General Inquiry',
  'Custom Software Development',
  'Web Development',
  'Mobile App Development',
  'IT Consultancy',
  'E-Commerce Solutions',
  'UI/UX Design',
  'QA & Testing',
  'Partnership',
  'Other',
]

function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setSuccess(null)
    setError(null)

    try {
      const res = await api.post<{ success: boolean; message: string }>('/contact', {
        name,
        email,
        subject,
        message,
      })

      setSuccess(res.data.message || 'Your message has been sent successfully!')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err: unknown) {
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err
      ) {
        const errorResponse = err as {
          response?: { data?: { message?: string } }
        }
        setError(
          errorResponse.response?.data?.message ||
          'Something went wrong. Please try again.'
        )
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="bg-[linear-gradient(180deg,_#f8fafc_0%,_#dbeafe_100%)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-sky-200 bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              Contact
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Ready to create a more professional digital presence?
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Tell us what you are building, what needs improvement, or where
              your team needs support. We will turn your ideas into a clear next
              step.
            </p>

            {/* Social media links */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                Follow us
              </p>
              <SocialLinks iconSize={22} />
            </div>
          </div>

          <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-xl shadow-sky-200/70 backdrop-blur sm:p-8">
            <form className="space-y-5" onSubmit={(e) => void handleSubmit(e)}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject
                </label>
                <select
                  id="contact-subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition duration-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  placeholder="Tell us about your project or business needs"
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl disabled:opacity-70"
                >
                  {submitting ? 'Sending...' : 'Submit Message'}
                </button>
              </div>

              {success ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              ) : null}

              {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
