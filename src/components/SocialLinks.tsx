import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa6'

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1Ck1wAR9Fh/',
    icon: FaFacebook,
    hoverColor: 'hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/hawisoftware?igsh=MXJoY205N3lrYXN0YQ==',
    icon: FaInstagram,
    hoverColor: 'hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-950/40',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@hawisoftware?_r=1&_t=ZS-95wfPFNlVeH',
    icon: FaTiktok,
    hoverColor: 'hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-white/10',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/hawi-software-solutions/',
    icon: FaLinkedin,
    hoverColor: 'hover:text-sky-700 hover:bg-sky-50 dark:hover:bg-sky-950/40',
  },
]

interface SocialLinksProps {
  /** Extra Tailwind classes applied to the outer wrapper */
  className?: string
  /** Icon size in pixels (default: 18) */
  iconSize?: number
}

function SocialLinks({ className = '', iconSize = 18 }: SocialLinksProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {SOCIAL_LINKS.map(({ name, href, icon: Icon, hoverColor }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Follow us on ${name}`}
          title={name}
          className={`
            inline-flex items-center justify-center rounded-xl p-2
            text-slate-500 dark:text-slate-400
            transition-all duration-300
            hover:-translate-y-0.5 hover:shadow-md
            ${hoverColor}
          `}
        >
          <Icon size={iconSize} aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks
