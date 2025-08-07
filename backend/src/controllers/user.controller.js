import mongoose from "mongoose";
import User from "../models/user.model.js";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({ message: "Server error (getUserById)." });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    res.json(user);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    res.status(500).json({ message: "Server error (getCurrentUser)." });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    if (req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized to update this profile." });
    }

    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
      select: "-password",
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("updateUserById error:", error);
    res.status(500).json({ message: "Server error (updateUserById)." });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required." });
    }

    const regex = new RegExp(query, "i");

    const users = await User.find({
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex },
      ],
    }).select("firstName lastName profilePic bio");

    res.json(users);
  } catch (error) {
    console.error("searchUsers error:", error);
    res.status(500).json({ message: "Server error (searchUsers)." });
  }
};
