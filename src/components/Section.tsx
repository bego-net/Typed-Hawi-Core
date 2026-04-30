import React from 'react'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  containerClassName?: string
  background?: 'light' | 'dark' | 'alt' | 'none'
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  containerClassName = '',
  background = 'none'
}) => {
  const bgStyles = {
    light: 'bg-white dark:bg-slate-950',
    dark: 'bg-slate-900 dark:bg-slate-950',
    alt: 'bg-slate-50 dark:bg-slate-900/50',
    none: ''
  }

  return (
    <section
      id={id}
      className={`py-16 sm:py-24 lg:py-32 ${bgStyles[background]} ${className}`}
    >
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${containerClassName}`}>
        {children}
      </div>
    </section>
  )
}

export default Section
