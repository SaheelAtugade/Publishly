import jwt from "jsonwebtoken";
import userModel from "../models/users.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        error: "Authentication required.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await userModel
      .findById(decoded.id)
      .select("_id name email");

    if (!user) {
      return res.status(401).json({
        error: "User not found.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      error: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;