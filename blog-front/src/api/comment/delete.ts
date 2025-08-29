import { API } from "../auth";

export async function deleteComment(id: string) {
  const res = await API.delete(`/comments/${id}`);
  return res.data;
}
