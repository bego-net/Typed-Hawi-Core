import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { removeToken } from '../../auth/token'
import { useTheme } from '../../context/ThemeContext'
import logoImg from '../../assets/logo.png'

const NAV_ITEMS = [
  { name: 'Services', path: '/admin/services', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { name: 'Products', path: '/admin/products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { name: 'Testimonials', path: '/admin/testimonials', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { name: 'Partners', path: '/admin/partners', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'Contacts', path: '/admin/contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

export default function AdminLayout() {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    setLoggingOut(true)
    removeToken()
    // Simulated short delay for UX
    setTimeout(() => {
      setLoggingOut(false)
      navigate('/admin/login', { replace: true })
      window.location.reload()
    }, 500)
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const ThemeToggleIcon = theme === 'light' ? (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )

  const SidebarContent = () => (
    <>
      <div className="flex h-16 shrink-0 items-center gap-3 px-6">
        <div className="flex items-center justify-center p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <img src={logoImg} alt="Hawi Logo" className="h-6 w-auto object-contain" />
        </div>
        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
          Admin Panel
        </span>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-4 overflow-y-auto">
        <ul className="flex flex-1 flex-col gap-1.5">
          {NAV_ITEMS.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={`h-5 w-5 shrink-0 transition-colors ${
                        isActive ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    {item.name}
                  </>
                )}
              </NavLink>
            </li>
          ))}
          <li className="mt-auto pt-4">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-300 disabled:opacity-50"
            >
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              {loggingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </li>
        </ul>
      </nav>
    </>
  )

  return (
    <div className="flex min-h-screen w-full bg-slate-50 dark:bg-[#050505] transition-colors duration-500">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:dark:border-white/10 lg:bg-white lg:dark:bg-[#0a0a0a]">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-slate-900/80 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white dark:bg-[#0a0a0a] shadow-xl lg:hidden border-r border-slate-200 dark:border-white/10"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-72 w-full">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8 transition-colors duration-500">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-slate-700 dark:text-slate-300 lg:hidden"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 lg:hidden" aria-hidden="true" />
            <h1 className="text-sm font-semibold leading-6 text-slate-900 dark:text-white sm:text-base hidden sm:block">
              Hawi Dashboard
            </h1>
          </div>
          
          <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
              aria-label="Toggle Theme"
            >
              {ThemeToggleIcon}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
            <div className="flex items-center gap-x-4">
              <span className="sr-only">Your profile</span>
              <div className="h-8 w-8 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 font-bold border border-cyan-200 dark:border-cyan-800/50">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 py-8">
          <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl w-full">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  )
}
