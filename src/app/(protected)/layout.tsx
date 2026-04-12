// Layout خاص بالصفحات المحمية (يتحقق من التوكن)
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
