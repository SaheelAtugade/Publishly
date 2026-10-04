import express from "express";

import {
  createPost,
  getPublicPosts,
  getMyPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route to get all posts
router.get("/public", getPublicPosts);
// All these post routes require login
router.post("/", authMiddleware, createPost);
router.get("/my", authMiddleware, getMyPosts);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;