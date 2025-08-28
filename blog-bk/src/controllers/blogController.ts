import { Request, Response } from "express";
import { BlogService } from "../services/blogService";

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    const imageUrl = req.file ? req.file.path : undefined;
    const blog = await BlogService.createBlog({ title, content, authorId, imageUrl });
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