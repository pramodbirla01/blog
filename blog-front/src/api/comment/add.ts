import { API } from "../auth";

export async function addComment({ blogId, content }: { blogId: string; content: string }) {
  const res = await API.post("/comments/add", { blogId, content });
  return res.data;
}
