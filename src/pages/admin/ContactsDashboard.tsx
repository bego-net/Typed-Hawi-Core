import { useEffect, useState } from 'react'
import api from '../../api/axios'
import Card from '../../components/admin/Card'
import Button from '../../components/admin/Button'
import Input from '../../components/admin/Input'
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
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selected, setSelected] = useState<Contact | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replying, setReplying] = useState(false)
  const [replySuccess, setReplySuccess] = useState<string | null>(null)
  const [replyError, setReplyError] = useState<string | null>(null)

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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Contact Messages
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          View and reply to messages from the contact form.
        </p>
      </div>

        {/* Error */}
        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
            {error}
          </p>
        ) : null}

        {/* Content */}
        <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          {/* Message list */}
          <Card className="p-0 overflow-hidden h-[70vh] flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Messages{' '}
                <span className="text-sm font-normal text-slate-500">
                  ({contacts.length})
                </span>
              </h2>
              <Button
                variant="ghost"
                onClick={() => void fetchContacts()}
                className="px-3 py-1.5 text-xs"
              >
                Refresh
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {loading ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  Loading messages...
                </p>
              ) : contacts.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-4 py-8 text-center text-slate-500 mt-4 mx-2">
                  No messages yet.
                </p>
              ) : (
                contacts.map((contact) => (
                  <button
                    key={contact.id}
                    type="button"
                    onClick={() => openMessage(contact)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selected?.id === contact.id
                        ? 'border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-900/20'
                        : 'border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/30 hover:border-cyan-200 dark:hover:border-cyan-800 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {contact.name}
                      </p>
                      {contact.is_replied ? (
                        <span className="shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          Replied
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 truncate">
                      {contact.subject}
                    </p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                      {formatDate(contact.created_at)}
                    </p>
                  </button>
                ))
              )}
            </div>
          </Card>

          {/* Message detail + reply */}
          <Card className="p-6 h-[70vh] overflow-y-auto">
            {selected ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {selected.subject}
                    </h2>
                    <Button
                      variant="ghost"
                      onClick={() => setSelected(null)}
                    >
                      ✕ Close
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    From:{' '}
                    <span className="font-medium text-slate-900 dark:text-white">
                      {selected.name}
                    </span>{' '}
                    &lt;{selected.email}&gt;
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {formatDate(selected.created_at)}
                  </p>
                </div>

                {/* Message */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Message
                  </p>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#151515] px-5 py-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>

                {/* Existing reply */}
                {selected.reply ? (
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-500">
                      Your Reply
                    </p>
                    <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/10 px-5 py-4 text-sm leading-relaxed text-emerald-800 dark:text-emerald-200 whitespace-pre-wrap">
                      {selected.reply}
                    </div>
                  </div>
                ) : null}

                {/* Reply form */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    {selected.is_replied ? 'Update Reply' : 'Write Reply'}
                  </p>
                  
                  <Input
                    multiline
                    rows={6}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                  />

                  {replySuccess ? (
                    <p className="mt-3 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                      {replySuccess}
                    </p>
                  ) : null}

                  {replyError ? (
                    <p className="mt-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400">
                      {replyError}
                    </p>
                  ) : null}

                  <div className="mt-4 flex justify-end">
                    <Button
                      onClick={() => void handleReply()}
                      disabled={replying || !replyText.trim()}
                    >
                      {replying
                        ? 'Sending...'
                        : selected.is_replied
                          ? 'Update & Resend Email'
                          : 'Send Reply & Email'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-slate-400">
                  Select a message to view details and reply.
                </p>
              </div>
            )}
          </Card>
        </div>
    </div>
  )
}
