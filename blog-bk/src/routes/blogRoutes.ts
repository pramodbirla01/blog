import { Router } from "express";
import { createBlog, getAllBlogs } from "../controllers/blogController";
import { upload } from "../middleware/multer";

const router = Router();

router.post("/blog/add", upload.single("image"), createBlog);
router.get("/blogs", getAllBlogs);

export default router;