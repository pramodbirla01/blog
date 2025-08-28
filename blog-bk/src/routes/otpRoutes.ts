import { Router } from "express";
import { sendOtp, verifyOtp } from "../controllers/otpController";

const router = Router();

router.post("/login/send-otp", sendOtp);
router.post("/login/verify-otp", verifyOtp);

export default router;
