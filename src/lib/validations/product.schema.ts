import { z } from 'zod'

export const productSchema = z.object({
  title: z
    .string()
    .min(1, 'اسم المنتج مطلوب')
    .min(3, 'اسم المنتج يجب أن يكون 3 أحرف على الأقل')
    .max(100, 'اسم المنتج يجب أن لا يتجاوز 100 حرف'),
  description: z
    .string()
    .min(1, 'وصف المنتج مطلوب')
    .min(20, 'وصف المنتج يجب أن يكون 20 حرف على الأقل'),
  quantity: z.coerce
    .number()
    .min(0, 'الكمية يجب أن تكون 0 أو أكثر'),
  price: z.coerce
    .number()
    .min(0, 'السعر يجب أن يكون 0 أو أكثر'),
  priceAfterDiscount: z.coerce
    .number()
    .min(0, 'سعر الخصم يجب أن يكون 0 أو أكثر')
    .optional(),
  colors: z.array(z.string()).optional(),
  category: z.string().min(1, 'الفئة مطلوبة'),
  subCategories: z.array(z.string()).optional(),
  brand: z.string().optional(),
})

export type ProductFormData = z.infer<typeof productSchema>