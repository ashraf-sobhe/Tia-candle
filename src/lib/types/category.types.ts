export interface Category {
  _id: string
  name: string
  slug: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface SubCategory {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}

export interface CategoriesResponse {
  status: 'success'
  results: number
  paginationResult: {
    currentPage: number
    limit: number
    numberOfPages: number
  }
  data: {
    categories: Category[]
  }
}

export interface CategoriesResponse {
  status: 'success'
  meta: {
    currentPage: number
    limit: number
    numberOfPages: number
    total: number
  }
  data: {
    categories: Category[]
  }
}

export interface SubCategoriesResponse {
  status: 'success'
  meta: {
    currentPage: number
    limit: number
    numberOfPages: number
    total: number
  }
  data: {
    subCategories: SubCategory[]
  }
}

export interface SubCategoryResponse {
  status: 'success'
  data: {
    subCategory: SubCategory
  }
}