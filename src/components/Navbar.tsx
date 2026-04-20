import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { serviceLinks } from '../constants/services'
import { removeToken, isAdminLoggedIn } from '../auth/token'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const servicesMenuRef = useRef<HTMLDivElement | null>(null)

  // ✅ compute directly (no useEffect needed)
  const isAdmin = isAdminLoggedIn()

  // ✅ close dropdown on outside click
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

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 py-4">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-500 text-white flex items-center justify-center rounded-lg font-bold">
            H
          </div>
          <span className="font-semibold">Hawi</span>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-4">

          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>

          {/* SERVICES */}
          <div ref={servicesMenuRef} className="relative">

            <button
              type="button"
              onClick={() => setIsServicesOpen(prev => !prev)}
              aria-expanded={Boolean(isServicesOpen)} // ✅ FIXED
              className="px-3 py-1 border rounded"
            >
              Services
            </button>

            {isServicesOpen && (
              <div className="absolute mt-2 bg-white border rounded shadow w-48">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-3 py-2 hover:bg-gray-100"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/contact">Contact</NavLink>

          {/* ADMIN */}
          {isAdmin && (
            <>
              <NavLink to="/admin/services">Admin</NavLink>

              <button
                type="button"
                onClick={() => {
                  removeToken()
                  window.location.reload()
                }}
                className="px-3 py-1 border rounded"
              >
                Logout
              </button>
            </>
          )}

        </nav>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(prev => !prev)}
          className="md:hidden"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">

          <NavLink to="/" className="block py-2">Home</NavLink>
          <NavLink to="/about" className="block py-2">About</NavLink>

          <button
            type="button"
            onClick={() => setIsServicesOpen(prev => !prev)}
            className="block py-2 w-full text-left"
          >
            Services
          </button>

          {isServicesOpen && (
            <div className="pl-4">
              {serviceLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block py-2"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsServicesOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          <NavLink to="/contact" className="block py-2">Contact</NavLink>

          {isAdmin && (
            <>
              <NavLink to="/admin/services" className="block py-2">
                Admin
              </NavLink>

              <button
                type="button"
                onClick={() => {
                  removeToken()
                  window.location.reload()
                }}
                className="block py-2"
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