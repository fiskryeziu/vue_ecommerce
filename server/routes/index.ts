import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.route";
import stripeRoute from "./stripe.route";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/products", productRoutes);
routes.use("/stripe", stripeRoute);

export default routes;
