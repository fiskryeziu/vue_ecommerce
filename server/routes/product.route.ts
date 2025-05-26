import { Router } from "express";
import {
  getBestSeller,
  getFeatured,
  getNewArrivals,
} from "../controller/product.controller";

const router = Router();

router.get("/new-arrivals", getNewArrivals);
router.get("/featured", getFeatured);
router.get("/best-sellers", getBestSeller);

export default router;
