import { Router } from "express";
import {
  getBestSeller,
  getFeatured,
  getNewArrivals,
  getProduct,
  getProducts,
  getProductsByCategory,
  getRelatedProducts,
} from "../controller/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/new-arrivals", getNewArrivals);
router.get("/categories", getProductsByCategory);
router.get("/featured", getFeatured);
router.get("/best-sellers", getBestSeller);
router.get("/:slug", getProduct);
router.get("/related/:slug", getRelatedProducts);

export default router;
