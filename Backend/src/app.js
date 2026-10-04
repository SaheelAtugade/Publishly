import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import reportRoutes from "./routes/report.routes.js";
import cookieParser from "cookie-parser";
import path from "path";


const app = express();

app.use(
  cors()
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reports", reportRoutes);

// Test route
app.get("/health", (req, res) => {
  res.json({
    message: "Publishly API is running",
  });
});

// wildcard route for showing public folder
app.use(express.static("public"));

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname,"..","/public/index.html"))
});

export default app;