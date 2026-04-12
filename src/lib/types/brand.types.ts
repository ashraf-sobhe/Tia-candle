export interface Brand {
  _id: string
  name: string
  slug: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface BrandsResponse {
  status: 'success'
  meta: {
    currentPage: number
    limit: number
    numberOfPages: number
    total: number
  }
  data: {
    brands: Brand[]
  }
}

export interface BrandResponse {
  status: 'success'
  data: {
    brand: Brand
  }
}