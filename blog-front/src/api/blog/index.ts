
import { API } from '../auth';

export async function getAllBlogs() {
  const res = await API.get('/blogs');
  return res.data;
}
