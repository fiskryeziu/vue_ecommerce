import { Router } from "express";
import {
  getBestSeller,
  getFeatured,
  getNewArrivals,
  getProduct,
  getProductsByCategory,
} from "../controller/product.controller";

const router = Router();

router.get("/new-arrivals", getNewArrivals);
router.get("/categories", getProductsByCategory);
router.get("/featured", getFeatured);
router.get("/best-sellers", getBestSeller);
router.get("/:slug", getProduct);

export default router;
