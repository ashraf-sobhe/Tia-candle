import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartStore {
  cartId: string | null
  itemsCount: number
  setCart: (cartId: string, count: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartId: null,
      itemsCount: 0,
      setCart: (cartId, itemsCount) => set({ cartId, itemsCount }),
      clearCart: () => set({ cartId: null, itemsCount: 0 }),
    }),
    { name: 'cart-storage' }
  )
)