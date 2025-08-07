import React, { useState } from "react";
import { createPost } from "../../api/posts";
import { toast } from "react-hot-toast";

const PostCreateBox = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await createPost({ content: content.trim() });
      toast.success("Post created!");
      setContent("");
      if (onPostCreated) onPostCreated(); 
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 rounded-md border border-gray-300 bg-base-100"
    >
      <textarea
        className="textarea textarea-bordered w-full resize-none h-20"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={`btn btn-primary mt-2 ${loading ? "loading" : ""}`}
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default PostCreateBox;
