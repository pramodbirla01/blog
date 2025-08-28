import { AppDataSource } from "../config/data-source";
import { Blog } from "../entities/Blog";
import { User } from "../entities/User";


interface CreateBlogInput {
  title: string;
  content: string;
  authorId?: string; // Now optional
  imageUrl?: string;
}

export const BlogService = {

  async createBlog({ title, content, authorId, imageUrl }: CreateBlogInput) {
    const blogRepo = AppDataSource.getRepository(Blog);
    let author = undefined;
    if (authorId) {
      const userRepo = AppDataSource.getRepository(User);
      try {
        author = await userRepo.findOneByOrFail({ id: authorId });
      } catch {
        // If authorId is invalid, ignore and create blog without author
        author = undefined;
      }
    }
    const blog = blogRepo.create({ title, content, imageUrl, ...(author && { author }) });
    return await blogRepo.save(blog);
  },

  async getAllBlogs() {
    const blogRepo = AppDataSource.getRepository(Blog);
    return await blogRepo.find({ relations: ["author", "comments"] });
  },
};