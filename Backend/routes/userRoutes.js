// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getSelf,
} from "../controllers/UserController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, getSelf);

export default router;
