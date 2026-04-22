import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { removeToken } from '../../auth/token'
import ServiceList from '../../components/ServiceList'

export default function ServicesDashboard() {
  const navigate = useNavigate()
  const [loggingOut, setLoggingOut] = useState(false)

  const logout = async () => {
    try {
      setLoggingOut(true)
      await api.post('/admin/logout')
    } catch {
      // ignore: token might already be invalid
    } finally {
      removeToken()
      setLoggingOut(false)
      navigate('/admin/login', { replace: true })
    }
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Admin Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Manage Services
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Create, update, and remove services that appear on the public site.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => navigate('/admin/products')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Products</button>
            <button type="button" onClick={() => navigate('/admin/testimonials')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Testimonials</button>
            <button type="button" onClick={() => navigate('/admin/partners')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Partners</button>
            <button type="button" onClick={() => navigate('/admin/contacts')} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950">Contacts</button>
            <button type="button" onClick={() => void logout()} disabled={loggingOut} className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-70">
              {loggingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        </div>

        <ServiceList />
      </div>
    </div>
  )
}

