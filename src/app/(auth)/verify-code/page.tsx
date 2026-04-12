'use client'
import { useVerifyResetCode } from '@/lib/hooks/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifyResetCodeSchema, VerifyResetCodeFormData } from '@/lib/validations/auth.schema'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function VerifyCodePage() {
  const { mutate: verifyCode, isPending, isError, error } = useVerifyResetCode()
  const router = useRouter()

  useEffect(() => {
    const email = sessionStorage.getItem('reset-email')
    if (!email) router.replace('/forgot-password')
  }, [router])

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyResetCodeFormData>({
    resolver: zodResolver(verifyResetCodeSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: VerifyResetCodeFormData) => {
    verifyCode(data, {
      onSuccess: () => router.push('/reset-password'),
    })
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex flex-1 justify-center items-center px-8 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              أدخل الكود
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              أدخل الكود المكون من 6 أرقام اللي اتبعت على بريدك.
            </p>
          </div>
          {isError && <ErrorMessage message={getErrorMessage(error)} />}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="كود الإعادة"
              type="text"
              placeholder="123456"
              maxLength={6}
              error={errors.resetCode?.message}
              {...register('resetCode')}
            />
            <Button type="submit" isLoading={isPending} className="w-full py-3">
              تحقق من الكود
            </Button>
            <button
              type="button"
              onClick={() => router.push('/forgot-password')}
              className="block w-full text-sm text-center underline"
              style={{ color: 'var(--color-text-muted)' }}
            >
              ما وصلكش الكود؟ حاول تاني
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}