import { API } from "@/api/auth";

export async function getBlogById(id: string) {
  const res = await API.get(`/blog/${id}`);
  return res.data;
}
