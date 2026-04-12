'use client'
import { useLogin } from '@/lib/hooks/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '@/lib/validations/auth.schema'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

export default function LoginPage() {
  const { mutate: login, isPending, isError, error } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: LoginFormData) => {
    login(data)
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex flex-1 justify-center items-center px-8 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              تسجيل الدخول
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              ليس لديك حساب؟{' '}
              <Link href="/register" className="font-medium underline" style={{ color: 'var(--color-text)' }}>
                أنشئ حساباً
              </Link>
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
            <div className="space-y-1">
              <Input
                label="كلمة المرور"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register('password')}
              />
              <div className="flex justify-start">
                <Link href="/forgot-password" className="text-xs underline" style={{ color: 'var(--color-text-muted)' }}>
                  نسيت كلمة المرور؟
                </Link>
              </div>
            </div>
            <Button type="submit" isLoading={isPending} className="w-full py-3 mt-2">
              تسجيل الدخول
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}