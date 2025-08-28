import { AppDataSource } from "../config/data-source";
import { Blog } from "../entities/Blog";
import { User } from "../entities/User";


interface CreateBlogInput {
  title: string;
  content: string;
  imageUrl?: string;
  userId: string; // required, from JWT
}

export const BlogService = {

  async createBlog({ title, content, imageUrl, userId }: CreateBlogInput) {
    const blogRepo = AppDataSource.getRepository(Blog);
    const userRepo = AppDataSource.getRepository(User);
    const author = await userRepo.findOneByOrFail({ id: userId });
    const blog = blogRepo.create({ title, content, imageUrl, author });
    return await blogRepo.save(blog);
  },

  async getAllBlogs() {
    const blogRepo = AppDataSource.getRepository(Blog);
    return await blogRepo.find({
      relations: ["author", "comments", "comments.user"]
    });
  },
};