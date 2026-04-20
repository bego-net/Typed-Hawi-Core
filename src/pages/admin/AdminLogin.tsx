import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { setToken } from '../../auth/token'

// ✅ Response type
type LoginResponse = {
  success: boolean
  message: string
  data?: {
    token: string
    token_type: 'Bearer'
  }
}

// ✅ Proper location state type (NO any)
type LocationState = {
  from?: {
    pathname: string
  }
}

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()

  // ✅ FIXED (no any)
  const state = location.state as LocationState | null
  const from = state?.from?.pathname ?? '/admin/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await api.post<LoginResponse>('/admin/login', {
        email,
        password,
      })

      const token = res.data?.data?.token

      if (!token) {
        setError(res.data?.message || 'Login failed')
        return
      }

      setToken(token)
      navigate(from, { replace: true })

    } catch (err: unknown) {   // ✅ FIXED (no any)

      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err
      ) {
        const errorResponse = err as {
          response?: {
            data?: { message?: string }
          }
        }

        setError(
          errorResponse.response?.data?.message ||
          'Login failed. Please check your credentials.'
        )
      } else {
        setError('Login failed. Please check your credentials.')
      }

    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 py-16">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">
          Admin
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Sign in
        </h1>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              title="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
              autoComplete="email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              title="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-100"
              autoComplete="current-password"
              required
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
          >
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>

        </form>
      </div>
    </div>
  )
}