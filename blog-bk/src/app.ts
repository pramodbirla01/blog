

import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import cors from "cors";

import blogRoutes from "./routes/blogRoutes";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import otpRoutes from "./routes/otpRoutes";


dotenv.config();



const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRoutes);

app.use("/", blogRoutes);
app.use("/", commentRoutes);
app.use("/", otpRoutes);


export default app;
