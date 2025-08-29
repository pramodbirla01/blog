import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { generateOTP } from "../utils/otp";
import { sendOtpEmail } from "../utils/mailer";
import redis from "../utils/redisClient";

import jwt from "jsonwebtoken";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
  path: "/",
};

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    const otp = generateOTP(4);
    await redis.set(`otp:${email}`, otp, "EX", 300); // 5 minutes
  await sendOtpEmail(email, user.name, otp);
    res.json({ message: "OTP sent to email" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const savedOtp = await redis.get(`otp:${email}`);
    if (!savedOtp || savedOtp !== otp) return res.status(400).json({ error: "Invalid or expired OTP" });
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    await redis.del(`otp:${email}`);
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "15d" });
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({
      message: "OTP login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
