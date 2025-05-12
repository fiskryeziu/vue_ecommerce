import { Router } from "express";
import { login, logout, me, signup } from "../controller/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/me", me);
router.post("/logout", logout);

export default router;
