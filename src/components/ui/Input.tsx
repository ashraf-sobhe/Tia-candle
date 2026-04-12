'use client'
import { InputHTMLAttributes, useState } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({
  label,
  error,
  className = '',
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label
          className='text-sm font-medium'
          style={{ color: 'var(--color-text)' }}
        >
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={`w-full px-4 py-2 rounded-lg outline-none transition-all duration-200 border
            ${isPassword ? 'pl-10' : ''}
            ${className}`}
          style={{
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text)',
            borderColor: error ? 'var(--color-error)' : 'var(--color-border)',
          }}
          {...props}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute left-3 top-1/2 -translate-y-1/2 transition-colors'
            style={{ color: 'var(--color-text-muted)' }}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>
      {error && (
        <span
          className='text-sm'
          style={{ color: 'var(--color-error)' }}
        >
          {error}
        </span>
      )}
    </div>
  )
}