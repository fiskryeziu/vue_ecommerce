import {
  getBestSellerProduct,
  getFeaturedProducts,
  getNewArrivalsProducts,
  queryProduct,
  queryProducts,
  queryProductsByCategory,
  queryRelatedProducts,
} from "../db/product.queries";
import type { Category } from "../types/user";

export const fetchProducts = async (filters: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) => {
  return await queryProducts(filters);
};

export const fetchProductsByCategory = async (category: Category) => {
  return await queryProductsByCategory(category);
};

export const fetchNewArrivalsProducts = async () => {
  return await getNewArrivalsProducts();
};

export const fetchFeaturedProducts = async () => {
  return await getFeaturedProducts();
};

export const fetchBestSellerProduct = async () => {
  return await getBestSellerProduct();
};
export const fetchProduct = async (slug: string) => {
  return await queryProduct(slug);
};
export const fetchRelatedProducts = async (slug: string) => {
  return await queryRelatedProducts(slug);
};
