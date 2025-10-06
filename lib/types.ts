export interface BlogPost {
  slug: string
  title: string
  date: string
  tags: string[]
  coverImage: string
  excerpt: string
  content: string
}

export interface BlogPostMetadata {
  slug: string
  title: string
  date: string
  tags: string[]
  coverImage: string
  excerpt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}
