import express from "express";

import {
  register,
  login,
  getMe,
  logout,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logout);

export default router;