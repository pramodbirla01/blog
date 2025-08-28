import { AppDataSource } from "../config/data-source";
import { Blog } from "../entities/Blog";
import { User } from "../entities/User";

interface CreateBlogInput {
  title: string;
  content: string;
  authorId: string;
  imageUrl?: string;
}

export const BlogService = {
  async createBlog({ title, content, authorId, imageUrl }: CreateBlogInput) {
    const userRepo = AppDataSource.getRepository(User);
    const blogRepo = AppDataSource.getRepository(Blog);
    const author = await userRepo.findOneByOrFail({ id: authorId });
    const blog = blogRepo.create({ title, content, imageUrl, author });
    return await blogRepo.save(blog);
  },

  async getAllBlogs() {
    const blogRepo = AppDataSource.getRepository(Blog);
    return await blogRepo.find({ relations: ["author", "comments"] });
  },
};