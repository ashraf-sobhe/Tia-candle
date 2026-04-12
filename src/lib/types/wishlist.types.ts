import { Product } from './product.types'

export interface WishlistResponse {
  status: 'success'
  data: {
    wishlist: Product[]
  }
}