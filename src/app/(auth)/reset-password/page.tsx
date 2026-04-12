'use client'
import { useResetPassword } from '@/lib/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema, ResetPasswordFormData } from '@/lib/validations/auth.schema'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

export default function ResetPasswordPage() {
  const { mutate: resetPassword, isPending, isError, error } = useResetPassword()
  const router = useRouter()

  useEffect(() => {
    const email = sessionStorage.getItem('reset-email')
    if (!email) router.replace('/forgot-password')
  }, [router])

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: ResetPasswordFormData) => {
    const email = sessionStorage.getItem('reset-email')!
    resetPassword(
      { email, newPassword: data.newPassword, confirmPassword: data.confirmPassword },
      {
        onSuccess: () => {
          sessionStorage.removeItem('reset-email')
          router.push('/')
        },
      }
    )
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex flex-1 justify-center items-center px-8 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              تعيين كلمة مرور جديدة
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير ورقم ورمز.
            </p>
          </div>
          {isError && <ErrorMessage message={getErrorMessage(error)} />}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="كلمة المرور الجديدة"
              type="password"
              placeholder="••••••••"
              error={errors.newPassword?.message}
              {...register('newPassword')}
            />
            <Input
              label="تأكيد كلمة المرور"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Button type="submit" isLoading={isPending} className="w-full py-3">
              تعيين كلمة المرور
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}