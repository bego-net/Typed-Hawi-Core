import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact Us', href: '/contact' },
]

function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-slate-800 bg-slate-950 text-center text-slate-300"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-rose-500 to-orange-400 text-sm font-bold tracking-[0.24em] text-white shadow-lg shadow-rose-300/20">
            H
          </span>
        </div>
        <p className="mt-4 text-xl font-semibold tracking-tight text-white">
          Hawi Software Solutions
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
          Building modern software, digital products, and business systems that
          help organizations move forward with clarity.
        </p>
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-5">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-slate-400 transition duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 text-sm text-slate-500">
          Copyright {new Date().getFullYear()} Hawi Software Solutions. All
          rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
