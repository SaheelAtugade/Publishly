import express from "express";
import { getReports } from "../controllers/report.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getReports);

export default router;