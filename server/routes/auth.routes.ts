import { Router } from "express";
import { login, logout, me, signup } from "../controller/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, me);
router.post("/logout", logout);

export default router;
