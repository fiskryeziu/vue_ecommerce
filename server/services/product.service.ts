import {
  getBestSellerProduct,
  getFeaturedProducts,
  getNewArrivalsProducts,
} from "../db/product.queries";

export const fetchNewArrivalsProducts = async () => {
  return await getNewArrivalsProducts();
};

export const fetchFeaturedProducts = async () => {
  return await getFeaturedProducts();
};

export const fetchBestSellerProduct = async () => {
  return await getBestSellerProduct();
};
