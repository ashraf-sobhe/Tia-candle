interface ErrorMessageProps {
  message?: string
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null
  return (
    <div
      className="w-full px-4 py-3 rounded-lg border"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)',
        borderColor: 'color-mix(in srgb, var(--color-error) 20%, transparent)',
      }}
    >
      <p className="text-sm" style={{ color: 'var(--color-error)' }}>{message}</p>
    </div>
  )
}