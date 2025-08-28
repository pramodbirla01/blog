import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { generateOTP } from "../utils/otp";
import { sendOtpEmail } from "../utils/mailer";
import redis from "../utils/redisClient";
import jwt from "jsonwebtoken";

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
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
