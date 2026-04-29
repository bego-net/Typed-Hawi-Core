import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { setToken } from '../../auth/token'
import Button from '../../components/admin/Button'
import Input from '../../components/admin/Input'

// Response type — matches the backend AdminAuthController response
type LoginResponse = {
  success: boolean
  message: string
  token?: string
  token_type?: 'Bearer'
  user?: {
    id: number
    name: string
    email: string
    role: string | null
    is_admin: boolean
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

      const token = res.data?.token

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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#050505] p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111] p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-500">
            Hawi Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
            Sign in
          </h1>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-500/30 px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              disabled={submitting}
              className="w-full justify-center"
            >
              {submitting ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}