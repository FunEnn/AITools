import cors from "cors";
import express from "express";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { upload } from "../configs/multer.js";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  resumeReview,
} from "../controllers/aiController.js";
import {
  deleteCreation,
  getPublishedCreations,
  getUserCreations,
  toggleLikeCreation,
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const app = express();

// 添加日志中间件
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// 健康检查路由
app.get("/", (_req, res) => res.json({ message: "AI Tools API is running!" }));

// 需要认证的路由
app.use(requireAuth());

// AI 相关路由
app.post("/api/ai/generate-article", auth, generateArticle);
app.post("/api/ai/generate-blog-title", auth, generateBlogTitle);
app.post("/api/ai/generate-image", auth, generateImage);
app.post("/api/ai/resume-review", auth, upload.single("resume"), resumeReview);

// 用户相关路由
app.get("/api/user/get-user-creations", auth, getUserCreations);
app.get("/api/user/get-published-creations", auth, getPublishedCreations);
app.post("/api/user/toggle-like-creation/:id", auth, toggleLikeCreation);
app.delete("/api/user/delete-creation/:id", auth, deleteCreation);

// 导出 express 实例
export default app;
