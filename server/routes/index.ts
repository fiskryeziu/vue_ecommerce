import { Router } from "express";
import authRoutes from "./auth.routes";
import productRoutes from "./product.route";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/products", productRoutes);

export default routes;
