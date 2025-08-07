import express from "express";
import {
  getUserById,
  getCurrentUser,
  updateUserById,
  searchUsers,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/search", searchUsers);
router.get("/me", protectRoute, getCurrentUser);
router.get("/:id", getUserById);
router.put("/:id", protectRoute, updateUserById);

export default router;
