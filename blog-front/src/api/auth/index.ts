export const logout = async () => {
  await API.post("/logout");
};
import axios from "axios";


export const API = axios.create({
  baseURL: "http://localhost:5000", // adjust if needed
  withCredentials: true,
});

export const register = async (name: string, email: string, password: string) => {
  const res = await API.post("/register", { name, email, password });
  return res.data;
};


export const login = async (email: string, password: string) => {
  const res = await API.post("/login", { email, password });
  return res.data;
};
