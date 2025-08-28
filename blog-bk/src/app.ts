
import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", blogRoutes);

export default app;
