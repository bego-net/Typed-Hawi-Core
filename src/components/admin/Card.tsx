import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0f0f0f] shadow-sm transition-colors duration-500 ${className}`}>
      {children}
    </div>
  )
}
