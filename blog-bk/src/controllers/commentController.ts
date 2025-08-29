
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Comment } from "../entities/Comments";
import { Blog } from "../entities/Blog";
import { User } from "../entities/User";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { blogId, content } = req.body;
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const blogRepo = AppDataSource.getRepository(Blog);
    const userRepo = AppDataSource.getRepository(User);
    const commentRepo = AppDataSource.getRepository(Comment);
    const blog = await blogRepo.findOneByOrFail({ id: blogId });
    const user = await userRepo.findOneByOrFail({ id: userId });
    const comment = commentRepo.create({ content, blog, user });
    await commentRepo.save(comment);
    res.status(201).json(comment);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const commentRepo = AppDataSource.getRepository(Comment);
    const comment = await commentRepo.findOne({ where: { id }, relations: ["user"] });
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    if (comment.user.id !== userId) return res.status(403).json({ error: "Forbidden" });
    await commentRepo.remove(comment);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};