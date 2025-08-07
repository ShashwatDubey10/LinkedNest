import React, { useState } from "react";
import { updateProfile } from "../../api/auth";
import { toast } from "react-hot-toast";

const ProfileHeader = ({ user, isOwner, onProfileUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(user.profilePic || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!profilePicUrl.trim()) return toast.error("Profile picture URL cannot be empty");

    setLoading(true);
    try {
      await updateProfile({ profilePic: profilePicUrl.trim() });
      toast.success("Profile picture updated!");
      onProfileUpdated && onProfileUpdated();
      setEditing(false);
    } catch (error) {
      toast.error("Failed to update profile picture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="avatar mb-4">
        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={
              user.profilePic ||
              "https://placehold.co/128x128?text=Profile+Pic"
            }
            alt={`${user.firstName} ${user.lastName}`}
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold">
        {user.firstName} {user.lastName}
      </h1>
      <p className="text-gray-600">{user.email}</p>

      {isOwner && (
        <>
          <button
            className="btn btn-sm btn-outline mt-3"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel" : "Edit Profile Picture"}
          </button>

          {editing && (
            <form
              className="mt-3 w-full max-w-sm flex flex-col gap-3"
              onSubmit={handleUpdate}
            >
              <input
                type="url"
                placeholder="Profile picture URL"
                className="input input-bordered w-full"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                Update
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
