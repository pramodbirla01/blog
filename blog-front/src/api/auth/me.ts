import { API } from "./index";

export const getMe = async () => {
  const res = await API.get("/me");
  return res.data;
};