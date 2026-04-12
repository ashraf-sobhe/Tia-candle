import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger'
  isLoading?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  style,
  ...props
}: ButtonProps) {

  const base = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer'

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-primary-foreground)',
    },
    outline: {
      border: '1px solid var(--color-primary)',
      color: 'var(--color-primary)',
      backgroundColor: 'transparent',
    },
    danger: {
      backgroundColor: 'var(--color-error)',
      color: '#ffffff',
    },
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={`${base} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {isLoading ? 'جاري التحميل...' : children}
    </button>
  )
}