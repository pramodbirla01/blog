import { Router } from "express";
import { addComment, deleteComment } from "../controllers/commentController";
import { authenticate } from "../middleware/auth";

const router = Router();


router.post("/comments/add", authenticate, addComment);
router.delete("/comments/:id", authenticate, deleteComment);

export default router;
