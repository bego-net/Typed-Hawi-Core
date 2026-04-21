import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { removeToken } from '../../auth/token'
import type { Contact } from '../../types/contact'

type ApiResponse = {
  success: boolean
  message: string
  data: Contact[]
}

type SingleResponse = {
  success: boolean
  message: string
  data: Contact
}

export default function ContactsDashboard() {
  const navigate = useNavigate()

  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Detail / reply state
  const [selected, setSelected] = useState<Contact | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replying, setReplying] = useState(false)
  const [replySuccess, setReplySuccess] = useState<string | null>(null)
  const [replyError, setReplyError] = useState<string | null>(null)

  const [loggingOut, setLoggingOut] = useState(false)

  // ── Fetch contacts ──────────────────────────────
  const fetchContacts = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.get<ApiResponse>('/admin/contacts')
      setContacts(res.data.data)
    } catch {
      setError('Unable to load messages. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchContacts()
  }, [])

  // ── Select a message ────────────────────────────
  const openMessage = (contact: Contact) => {
    setSelected(contact)
    setReplyText(contact.reply ?? '')
    setReplySuccess(null)
    setReplyError(null)
  }

  // ── Send reply ──────────────────────────────────
  const handleReply = async () => {
    if (!selected || !replyText.trim()) return

    try {
      setReplying(true)
      setReplyError(null)
      setReplySuccess(null)

      const res = await api.post<SingleResponse>(
        `/admin/contacts/${selected.id}/reply`,
        { reply: replyText }
      )

      setReplySuccess(res.data.message || 'Reply sent!')
      setSelected(res.data.data)

      // Update the list in place
      setContacts((prev) =>
        prev.map((c) => (c.id === res.data.data.id ? res.data.data : c))
      )
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'response' in err) {
        const errorResponse = err as {
          response?: { data?: { message?: string } }
        }
        setReplyError(
          errorResponse.response?.data?.message || 'Failed to send reply.'
        )
      } else {
        setReplyError('Failed to send reply.')
      }
    } finally {
      setReplying(false)
    }
  }

  // ── Logout ──────────────────────────────────────
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

  // ── Format date ─────────────────────────────────
  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
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
              Contact Messages
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              View and reply to messages from the contact form.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/services')}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => void logout()}
              disabled={loggingOut}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loggingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>

        {/* Error */}
        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* Message list */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Messages{' '}
                <span className="text-sm font-normal text-slate-400">
                  ({contacts.length})
                </span>
              </h2>
              <button
                type="button"
                onClick={() => void fetchContacts()}
                className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="py-8 text-center text-sm text-slate-500">
                Loading messages...
              </p>
            ) : contacts.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
                No messages yet.
              </p>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => openMessage(contact)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selected?.id === contact.id
                        ? 'border-cyan-300 bg-cyan-50'
                        : 'border-slate-200 bg-slate-50 hover:border-cyan-200 hover:bg-cyan-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {contact.name}
                      </p>
                      {contact.is_replied ? (
                        <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                          Replied
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500 truncate">
                      {contact.subject}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {formatDate(contact.created_at)}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Message detail + reply */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {selected ? (
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {selected.subject}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      className="shrink-0 text-sm text-slate-400 hover:text-slate-700"
                    >
                      ✕ Close
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    From:{' '}
                    <span className="font-medium text-slate-900">
                      {selected.name}
                    </span>{' '}
                    &lt;{selected.email}&gt;
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatDate(selected.created_at)}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Message
                  </p>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700 whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>

                {/* Existing reply */}
                {selected.reply ? (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600">
                      Your Reply
                    </p>
                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-800 whitespace-pre-wrap">
                      {selected.reply}
                    </div>
                  </div>
                ) : null}

                {/* Reply form */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {selected.is_replied ? 'Update Reply' : 'Write Reply'}
                  </p>
                  <textarea
                    rows={5}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                  />

                  {replySuccess ? (
                    <p className="mt-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      {replySuccess}
                    </p>
                  ) : null}

                  {replyError ? (
                    <p className="mt-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {replyError}
                    </p>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => void handleReply()}
                    disabled={replying || !replyText.trim()}
                    className="mt-3 rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
                  >
                    {replying
                      ? 'Sending...'
                      : selected.is_replied
                        ? 'Update & Resend Email'
                        : 'Send Reply & Email'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[300px] items-center justify-center">
                <p className="text-sm text-slate-400">
                  Select a message to view details and reply.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
