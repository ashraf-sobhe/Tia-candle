import { z } from 'zod'

export const checkoutSchema = z.object({
  details: z.string().min(1, 'العنوان مطلوب'),
  phone: z.string().min(11, 'رقم الهاتف يجب أن يكون 11 رقم').max(11, 'رقم الهاتف يجب أن يكون 11 رقم'),
  city: z.string().min(1, 'المدينة مطلوبة'),
  postalCode: z.string().optional(),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>