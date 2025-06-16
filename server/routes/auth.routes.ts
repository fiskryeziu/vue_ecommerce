import { Router } from "express";
import {
  login,
  logout,
  me,
  signup,
  updateProfile,
} from "../controller/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticate, me);
router.post("/logout", logout);
router.post("/update", authenticate, updateProfile);

export default router;
