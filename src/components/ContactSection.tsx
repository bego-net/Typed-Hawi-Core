import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import api from '../api/axios'
import SocialLinks from './SocialLinks'
import { 
  HiOutlineEnvelope, HiOutlinePhone, HiOutlineMapPin, 
  HiOutlineUser, HiOutlineTag, HiOutlineChatBubbleBottomCenterText 
} from 'react-icons/hi2'

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

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
    <section id="contact" className="relative py-24 sm:py-32 bg-slate-50 dark:bg-[#050505] transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-100/40 via-transparent to-transparent dark:from-cyan-900/20" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-x-16 gap-y-16 lg:grid-cols-2">
          
          {/* Left Column: Contact Info Cards */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col justify-center"
          >
            <motion.div variants={slideUp} className="max-w-xl mb-12">
              <span className="inline-flex rounded-full bg-cyan-100 dark:bg-cyan-500/10 px-4 py-1.5 text-sm font-semibold leading-6 text-cyan-700 dark:text-cyan-400 ring-1 ring-inset ring-cyan-700/20 dark:ring-cyan-500/20 mb-6">
                Let's Talk
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Ready to elevate your digital presence?
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                We're here to help you transform your vision into reality. Reach out to us through any of these channels.
              </p>
            </motion.div>

            <div className="space-y-4">
              <motion.div variants={slideUp} className="flex items-center gap-x-6 bg-white dark:bg-[#0f0f0f] p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-900/30">
                  <HiOutlineEnvelope className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">Email Us</h3>
                  <p className="mt-1 text-base text-slate-600 dark:text-slate-400">info@hawisoftware.com</p>
                </div>
              </motion.div>

              <motion.div variants={slideUp} className="flex items-center gap-x-6 bg-white dark:bg-[#0f0f0f] p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-900/30">
                  <HiOutlinePhone className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">Call Us</h3>
                  <p className="mt-1 text-base text-slate-600 dark:text-slate-400">+251 927 684 988</p>
                </div>
              </motion.div>

              <motion.div variants={slideUp} className="flex items-center gap-x-6 bg-white dark:bg-[#0f0f0f] p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-900/30">
                  <HiOutlineMapPin className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white">Visit Us</h3>
                  <p className="mt-1 text-base text-slate-600 dark:text-slate-400">Adama, Ethiopia (G7XG+FQH)</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={slideUp} className="mt-12">
              <p className="mb-4 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Connect With Us</p>
              <SocialLinks iconSize={26} />
            </motion.div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2.5rem] bg-white dark:bg-[#111] p-8 lg:p-12 border border-slate-200 dark:border-white/10 shadow-2xl"
          >
            <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="relative">
                  <label htmlFor="name" className="sr-only">Name</label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <HiOutlineUser className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-2xl border-0 bg-slate-50 dark:bg-[#1a1a1a] py-3.5 pl-11 pr-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/5 focus:ring-2 focus:ring-inset focus:ring-cyan-600 dark:focus:ring-cyan-500 sm:text-sm sm:leading-6 transition-all placeholder:text-slate-400"
                    placeholder="Your Name"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <HiOutlineEnvelope className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-2xl border-0 bg-slate-50 dark:bg-[#1a1a1a] py-3.5 pl-11 pr-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/5 focus:ring-2 focus:ring-inset focus:ring-cyan-600 dark:focus:ring-cyan-500 sm:text-sm sm:leading-6 transition-all placeholder:text-slate-400"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="subject" className="sr-only">Subject</label>
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <HiOutlineTag className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  id="subject"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block w-full rounded-2xl border-0 bg-slate-50 dark:bg-[#1a1a1a] py-3.5 pl-11 pr-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/5 focus:ring-2 focus:ring-inset focus:ring-cyan-600 dark:focus:ring-cyan-500 sm:text-sm sm:leading-6 transition-all appearance-none"
                >
                  <option value="" disabled>Select Inquiry Type</option>
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <label htmlFor="message" className="sr-only">Message</label>
                <div className="pointer-events-none absolute top-4 left-0 flex items-start pl-4">
                  <HiOutlineChatBubbleBottomCenterText className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full rounded-2xl border-0 bg-slate-50 dark:bg-[#1a1a1a] py-3.5 pl-11 pr-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-white/5 focus:ring-2 focus:ring-inset focus:ring-cyan-600 dark:focus:ring-cyan-500 sm:text-sm sm:leading-6 transition-all placeholder:text-slate-400 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto flex items-center justify-center rounded-2xl bg-cyan-600 dark:bg-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 hover:bg-cyan-500 dark:hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                >
                  {submitting ? 'Sending Request...' : 'Send Message'}
                </button>
              </div>

              {success && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 p-4 border border-emerald-200 dark:border-emerald-500/20">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-400">{success}</p>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl bg-rose-50 dark:bg-rose-500/10 p-4 border border-rose-200 dark:border-rose-500/20">
                  <p className="text-sm font-medium text-rose-800 dark:text-rose-400">{error}</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection

