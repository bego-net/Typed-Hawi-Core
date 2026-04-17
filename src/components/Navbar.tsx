import { useEffect, useState } from 'react'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
]

function Navbar() {
  const [activeSection, setActiveSection] = useState('#home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const sectionElements = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 140
      let currentSectionId = '#home'

      sectionElements.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
          currentSectionId = `#${section.id}`
        }
      })

      setActiveSection(currentSectionId)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
    }
  }, [])

  const handleLinkClick = (href: string) => {
    setActiveSection(href)
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 shadow-sm shadow-slate-200/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-orange-400 text-sm font-bold tracking-[0.24em] text-white shadow-lg shadow-rose-200 transition duration-300 group-hover:scale-105">
            H
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-950 sm:text-lg">
            Hawi Software
          </span>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-2 py-2 shadow-sm md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href

            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/15 md:inline-flex"
          >
            Get Started
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-300 hover:border-slate-300 hover:text-slate-950 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-slate-200 bg-white/95 px-4 py-4 shadow-lg shadow-slate-200/60 backdrop-blur md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition duration-300 ${
                    isActive
                      ? 'bg-slate-950 text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="#contact"
              onClick={() => handleLinkClick('#contact')}
              className="mt-2 rounded-2xl bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-rose-200 transition duration-300 hover:scale-[1.01]"
            >
              Get Started
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
