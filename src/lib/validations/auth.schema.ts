import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(1, 'كلمة المرور مطلوبة')
  .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير ورقم ورمز')
  .regex(/[A-Z]/, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير ورقم ورمز')
  .regex(/[a-z]/, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير ورقم ورمز')
  .regex(/[0-9]/, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير ورقم ورمز')
  .regex(/[^A-Za-z0-9]/, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف كبير وصغير ورقم ورمز')

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'الاسم مطلوب')
      .min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
    email: z
      .string()
      .min(1, 'البريد الإلكتروني مطلوب')
      .email('البريد الإلكتروني غير صحيح'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  })

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
})

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
})

export const verifyResetCodeSchema = z.object({
  resetCode: z
    .string()
    .min(1, 'كود الإعادة مطلوب')
    .length(6, 'كود الإعادة يجب أن يكون 6 أرقام')
    .regex(/^\d+$/, 'كود الإعادة يجب أن يحتوي على أرقام فقط'),
})

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, 'البريد الإلكتروني مطلوب')
      .email('البريد الإلكتروني غير صحيح'),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'كلمتا المرور غير متطابقتين',
    path: ['confirmPassword'],
  })

export type SignupFormData = z.infer<typeof signupSchema>
export type LoginFormData = z.infer<typeof loginSchema>
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>
export type VerifyResetCodeFormData = z.infer<typeof verifyResetCodeSchema>
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>