import { API } from "../auth";

export async function getCommentsForBlog(blogId: string) {
  // Comments are included in blog details, but this is for future use if needed
  const res = await API.get(`/blog/${blogId}`);
  return res.data.comments || [];
}
