import nodemailer from "nodemailer";
import { otpEmailTemplate } from "./templates/otpEmail";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

export async function sendOtpEmail(to: string, name: string, otp: string) {
  await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: otpEmailTemplate(name, otp),
  });
}
