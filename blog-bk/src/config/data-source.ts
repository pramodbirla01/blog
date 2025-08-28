import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Blog } from "../entities/Blog";
import { Comment } from "../entities/Comments";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "postgres",
  database: process.env.DB_NAME || "blog_app",
  synchronize: true, // ❌ turn off in production, use migrations instead
  logging: true,
  entities: [User, Blog, Comment],
  migrations: ["src/migrations/*.ts"],
});
