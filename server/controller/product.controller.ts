import type { Request, Response } from "express";
import {
  fetchBestSellerProduct,
  fetchFeaturedProducts,
  fetchNewArrivalsProducts,
} from "../services/product.service";

export const getNewArrivals = async (req: Request, res: Response) => {
  try {
    const products = await fetchNewArrivalsProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get new arrivals" });
  }
};

export const getFeatured = async (req: Request, res: Response) => {
  try {
    const products = await fetchFeaturedProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get featured products" });
  }
};

export const getBestSeller = async (req: Request, res: Response) => {
  try {
    const product = await fetchBestSellerProduct();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to get best seller product" });
  }
};
