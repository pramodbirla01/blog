
import { Router } from "express";
import { upload } from "../middleware/multer";
import { createBlog, getAllBlogs } from "../controllers/blogController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/blog/add", authenticate, upload.single("image"), createBlog);
router.get("/blogs", getAllBlogs);

export default router;