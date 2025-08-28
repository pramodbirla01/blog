import { Router } from "express";
import { addComment } from "../controllers/commentController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/comments/add", authenticate, addComment);

export default router;
