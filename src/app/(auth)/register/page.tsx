'use client'
import { useSignup } from '@/lib/hooks/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema, SignupFormData } from '@/lib/validations/auth.schema'
import Link from 'next/link'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { getErrorMessage } from '@/lib/utils/getErrorMessage'

export default function RegisterPage() {
  const { mutate: signup, isPending, isError, error } = useSignup()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  })

  const onSubmit = (data: SignupFormData) => {
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex flex-1 justify-center items-center px-8 py-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              إنشاء حساب
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              لديك حساب بالفعل؟{' '}
              <Link href="/login" className="font-medium underline" style={{ color: 'var(--color-text)' }}>
                سجّل دخولك
              </Link>
            </p>
          </div>
          {isError && <ErrorMessage message={getErrorMessage(error)} />}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="الاسم الكامل"
              type="text"
              placeholder="محمد أحمد"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="البريد الإلكتروني"
              type="email"
              placeholder="example@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="كلمة المرور"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              label="تأكيد كلمة المرور"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
            <Button type="submit" isLoading={isPending} className="w-full py-3">
              إنشاء حساب
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}