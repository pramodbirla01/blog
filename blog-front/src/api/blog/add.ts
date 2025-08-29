import { API } from "../auth";

export async function createBlog({ title, content, imageFile }: { title: string; content: string; imageFile?: File | null }) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (imageFile) formData.append("image", imageFile);
  const res = await API.post("/blog/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return res.data;
}
