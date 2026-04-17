import { useState } from 'react'
import type { FormEvent } from 'react'

function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
    event.currentTarget.reset()
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
          </div>

          <div className="mx-auto w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-xl shadow-sky-200/70 backdrop-blur sm:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  placeholder="Tell us about your project or business needs"
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-slate-500">
                  No backend submission yet. This form is ready for your next
                  integration step.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition duration-300 hover:-translate-y-1 hover:bg-slate-800 hover:shadow-xl"
                >
                  Submit Message
                </button>
              </div>

              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Thanks for reaching out. Your message has been captured
                  locally.
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
