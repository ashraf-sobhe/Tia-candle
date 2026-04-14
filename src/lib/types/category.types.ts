export interface Category {
  _id: string
  name: string
  slug: string
  image?: string
  createdAt: string
  updatedAt: string
  subCategories?: SubCategory[]
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
export interface CategoryResponse {
  status: 'success'
  data: {
    category: Category
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