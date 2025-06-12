import { Router, raw } from "express";
import {
  stripePayment,
  handleStripeWebhook,
} from "../controller/stripe.controller";

const router = Router();

router.post("/create-checkout-session", stripePayment);

export default router;
