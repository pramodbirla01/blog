
import express from "express";
import dotenv from "dotenv";

import blogRoutes from "./routes/blogRoutes";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import otpRoutes from "./routes/otpRoutes";


dotenv.config();

const app = express();
app.use(express.json());

app.use("/", authRoutes);

app.use("/", blogRoutes);
app.use("/", commentRoutes);
app.use("/", otpRoutes);


export default app;
