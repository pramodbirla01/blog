import { Router } from "express";
import { register, login, me, logout } from "../controllers/authController";

const router = Router();


import { authenticate } from "../middleware/auth";

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, me);
router.post("/logout", logout);

export default router;
