export type Product = {
  id: number
  title: string
  slug: string
  description?: string
  is_featured: boolean
  price: number
  compareprice?: number
  image?: string
  category?: string
  rating?: number
  created_at: string
}
export type Feature = 'new-arrivals' | 'featured' | 'best-sellers'

export type Category = 'rings' | 'charms-dangles' | 'necklaces' | 'bracelets'

export type TProducts = {
  products: Product[]
  totalPages: number
}
