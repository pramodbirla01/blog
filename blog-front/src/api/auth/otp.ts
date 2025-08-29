import { API } from ".";

export const sendOtp = async (email: string) => {
  const res = await API.post("/login/send-otp", { email });
  return res.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await API.post("/login/verify-otp", { email, otp });
  return res.data;
};
