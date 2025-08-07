import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const { content, author, createdAt } = post;

  return (
    <div className="card bg-base-100 shadow-md mb-4 p-4">
      <div className="flex items-center mb-2">
        <Link to={`/profile/${author._id}`}>
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={
                  author.profilePic ||
                  "https://placehold.co/48x48?text=User"
                }
                alt={`${author.firstName} ${author.lastName}`}
              />
            </div>
          </div>
        </Link>
        <div className="ml-3">
          <Link to={`/profile/${author._id}`} className="font-semibold hover:underline">
            {author.firstName} {author.lastName}
          </Link>
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>
      <p className="whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default PostCard;
