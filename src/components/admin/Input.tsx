import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

interface BaseProps {
  label: string
  error?: string | null
  className?: string
}

interface InputProps extends BaseProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  multiline?: false
}

interface TextareaProps extends BaseProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  multiline: true
}

type Props = InputProps | TextareaProps

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ label, error, className = '', multiline, ...props }, ref) => {
    const baseInputStyles = `w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#151515] px-4 py-2.5 text-slate-900 dark:text-white outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 dark:focus:ring-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${
      error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''
    }`

    return (
      <div className={`space-y-1.5 ${className}`}>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label} {props.required && <span className="text-red-500">*</span>}
        </label>
        {multiline ? (
          <textarea
            ref={ref as any}
            className={baseInputStyles}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as any}
            className={baseInputStyles}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
