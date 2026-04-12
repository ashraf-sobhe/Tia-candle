'use client'
import { useForgotPassword } from '@/lib/hooks/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/lib/validations/auth.schema'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const { mutate: forgotPassword, isPending, isError, error } = useForgotPassword()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data, {
      onSuccess: () => {
        sessionStorage.setItem('reset-email', data.email)
        router.push('/verify-code')
      },
    })
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex flex-1 justify-center items-center px-8 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              إعادة تعيين كلمة المرور
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              أدخل بريدك الإلكتروني وهنبعتلك كود مكون من 6 أرقام.
            </p>
          </div>
          {isError && <ErrorMessage message={getErrorMessage(error)} />}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Button type="submit" isLoading={isPending} className="w-full py-3">
              إرسال كود الإعادة
            </Button>
            <Link href="/login" className="block text-sm text-center underline" style={{ color: 'var(--color-text-muted)' }}>
              العودة لتسجيل الدخول
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}