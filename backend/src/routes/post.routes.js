import express from "express";
import {
  createPost,
  getAllPosts,
  getPostsByUser,
  getPostById,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import Post from "../models/post.model.js";

const router = express.Router();

router.post("/", protectRoute, createPost);
router.get("/", getAllPosts);

router.get("/user/me", protectRoute, async (req, res) => {
  try {
    const userId = req.user._id;
    const posts = await Post.find({ author: userId })
      .populate("author", "firstName lastName profilePic")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching current user posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user/:userId", getPostsByUser);
router.get("/:postId", getPostById);
router.delete("/:postId", protectRoute, deletePost);
router.put("/:postId", protectRoute, updatePost);

export default router;