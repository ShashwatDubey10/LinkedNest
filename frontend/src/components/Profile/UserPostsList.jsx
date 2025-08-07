import React from "react";
import PostCard from "../PostFeed/PostCard";

const UserPostsList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">This user has no posts yet.</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default UserPostsList;
