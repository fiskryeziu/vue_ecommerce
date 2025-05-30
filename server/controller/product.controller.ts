import type { Request, Response } from "express";
import {
  fetchBestSellerProduct,
  fetchFeaturedProducts,
  fetchNewArrivalsProducts,
  fetchProduct,
  fetchProducts,
  fetchProductsByCategory,
  fetchRelatedProducts,
} from "../services/product.service";
import type { Category } from "../types/user";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { categories, min_price, max_price, page, sort } = req.query;

    const filters = {
      category: categories as string | undefined,
      minPrice: min_price ? parseFloat(min_price as string) : undefined,
      maxPrice: max_price ? parseFloat(max_price as string) : undefined,
      page: page ? parseInt(page as string) : 1,
      sort: sort ? (sort as "low" | "high" | "latest") : undefined,
      limit: 5,
    };

    const { products, totalProducts } = await fetchProducts(filters);
    const totalPages = Math.ceil(totalProducts / 5);

    res.json({ products, totalPages });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to get products from that category" });
  }
};
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
export const getRelatedProducts = async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  try {
    const product = await fetchRelatedProducts(slug);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get the product related products" });
  }
};
