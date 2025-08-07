import mongoose from "mongoose";
import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Post content is required" });

    const newPost = new Post({
      content,
      author: req.user._id, 
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "firstName lastName profilePic") 
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userPosts = await Post.find({ author: userId })
      .populate("author", "firstName lastName profilePic")
      .sort({ createdAt: -1 });
    res.json(userPosts);
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate("author", "firstName lastName profilePic");
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You cannot delete this post" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  try {

    const postId = req.params.postId.trim();
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Forbidden: You cannot update this post" });
    }

    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Post content is required" });

    post.content = content;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};