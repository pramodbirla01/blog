import { Request, Response } from "express";
import { BlogService } from "../services/blogService";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;
    const userId = (req as any).userId; // from JWT middleware
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const blog = await BlogService.createBlog({ title, content, imageUrl, userId });
    res.status(201).json(blog);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await BlogService.getAllBlogs();
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};