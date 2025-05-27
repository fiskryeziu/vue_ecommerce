import type { Request, Response } from "express";
import {
  fetchBestSellerProduct,
  fetchFeaturedProducts,
  fetchNewArrivalsProducts,
  fetchProduct,
  fetchProductsByCategory,
} from "../services/product.service";
import type { Category } from "../types/user";

export const getProductsByCategory = async (req: Request, res: Response) => {
  const category = req.query.category as Category;
  try {
    const products = await fetchProductsByCategory(category);
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get product from that category" });
  }
};
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

export const getProduct = async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  try {
    const product = await fetchProduct(slug);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to get the product" });
  }
};
