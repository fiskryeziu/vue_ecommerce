import {
  getBestSellerProduct,
  getFeaturedProducts,
  getNewArrivalsProducts,
  queryProductsByCategory,
} from "../db/product.queries";
import type { Category } from "../types/user";

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
