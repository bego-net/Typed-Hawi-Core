import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { removeToken, isAdminLoggedIn } from '../auth/token'
import api from '../api/axios'
import type { Service } from '../types/service'

type ApiResponse = {
  success: boolean
  data: Service[]
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const navigate = useNavigate()

  const servicesMenuRef = useRef<HTMLDivElement | null>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isAdmin = isAdminLoggedIn()

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get<ApiResponse>('/services')
        setServices(res.data.data)
      } catch {
        // Silently fail — navbar still works without dropdown items
      }
    }
    void fetchServices()
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const openDropdown = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsServicesOpen(true)
  }

  const closeDropdown = () => {
    hoverTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 200)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-400 text-lg font-bold text-white shadow-md shadow-rose-200">
            H
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-950">
            Hawi
          </span>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`
            }
          >
            About
          </NavLink>

          {/* SERVICES DROPDOWN */}
          <div
            ref={servicesMenuRef}
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <button
              type="button"
              onClick={() => {
                navigate('/services')
                setIsServicesOpen(false)
              }}
              className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
            >
              Services
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            <div
              className={`absolute left-0 top-full mt-1 w-64 origin-top-left rounded-2xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-200/50 transition-all duration-200 ${
                isServicesOpen
                  ? 'visible scale-100 opacity-100'
                  : 'invisible scale-95 opacity-0'
              }`}
            >
              {services.length === 0 ? (
                <p className="px-4 py-3 text-sm text-slate-400">Loading…</p>
              ) : (
                services.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    className="block px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {service.title}
                  </Link>
                ))
              )}
              <div className="mx-3 my-1 border-t border-slate-100" />
              <Link
                to="/services"
                className="block px-4 py-2.5 text-sm font-medium text-cyan-600 transition hover:bg-cyan-50 hover:text-cyan-700"
                onClick={() => setIsServicesOpen(false)}
              >
                View All Services →
              </Link>
            </div>
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `rounded-xl px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`
            }
          >
            Contact
          </NavLink>

          {/* ADMIN */}
          {isAdmin && (
            <>
              <NavLink
                to="/admin/services"
                className={({ isActive }) =>
                  `rounded-xl px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-slate-100 text-slate-950' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`
                }
              >
                Admin
              </NavLink>
              <button
                type="button"
                onClick={() => {
                  removeToken()
                  window.location.reload()
                }}
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 md:hidden"
        >
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-slate-100 px-4 pb-4 md:hidden">
          <NavLink to="/" className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700" onClick={() => setIsMenuOpen(false)}>About</NavLink>

          <button
            type="button"
            onClick={() => setIsServicesOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700"
          >
            Services
            <svg className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isServicesOpen && (
            <div className="ml-3 space-y-0.5 border-l-2 border-slate-200 pl-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                  onClick={() => { setIsMenuOpen(false); setIsServicesOpen(false) }}
                >
                  {service.title}
                </Link>
              ))}
            </div>
          )}

          <NavLink to="/contact" className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>

          {isAdmin && (
            <>
              <NavLink to="/admin/services" className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700" onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
              <button
                type="button"
                onClick={() => { removeToken(); window.location.reload() }}
                className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar