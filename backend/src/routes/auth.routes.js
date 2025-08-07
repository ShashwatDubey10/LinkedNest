import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Signup route - public
router.post("/signup", signup);

// Login route - public
router.post("/login", login);

// Logout route - public (or can protect if you want)
router.post("/logout", logout);

// Update profile - protected route
router.put("/update-profile", protectRoute, updateProfile);

// Authentication check route - no protectRoute middleware because checkAuth verifies token from cookie and returns user data
router.get("/check", checkAuth);

export default router;
