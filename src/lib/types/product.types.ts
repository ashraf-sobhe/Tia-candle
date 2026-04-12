export interface Category {
  _id: string
  name: string
  slug: string
}

export interface SubCategory {
  _id: string
  name: string
  slug: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
}

export interface Product {
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  sold: number
  price: number
  priceAfterDiscount?: number
  colors: string[]
  images: string[]
  imageCover: string
  category: Category
  subCategories: SubCategory[]
  brand?: Brand
  ratingsAverage?: number
  ratingQuantity: number
  createdAt: string
  updatedAt: string
}

export interface ProductsResponse {
  status: 'success'
  meta: PaginationResult
  data: {
    products: Product[]
  }
}

export interface ProductResponse {
  status: 'success'
  data: {
    product: Product
  }
}

export interface PaginationResult {
  currentPage: number
  limit: number
  numberOfPages: number
  total: number
  next?: number
  prev?: number
}

export interface ProductsParams {
  page?: number
  limit?: number
  sort?: string
  keyword?: string
  category?: string
  brand?: string
  subCategories?: string
  'price[gte]'?: number
  'price[lte]'?: number
  'ratingsAverage[gte]'?: number
}