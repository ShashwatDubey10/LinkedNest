import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUserById } from "../api/users";
import { getPostsByUser } from "../api/posts";
import { toast } from "react-hot-toast";
import { useAuth } from "../App";

const getInitials = (firstName, lastName) => {
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName[0].toUpperCase();
  return "";
};

const ORANGE = "#f37021";
const DEEP_ORANGE = "#d14b00";
const DARK_BG = "#0a0a0b";

const ProfilePage = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const userId = id === "me" ? currentUser?._id : id;

  const [profileUser, setProfileUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [editingBio, setEditingBio] = useState(false);
  const [bioDraft, setBioDraft] = useState("");
  const [updatingBio, setUpdatingBio] = useState(false);

  useEffect(() => {
    const fetchUserProfileAndPosts = async () => {
      if (!userId) {
        toast.error("User not found or not authenticated");
        return;
      }
      setLoadingProfile(true);
      setLoadingPosts(true);
      try {
        const userData = await getUserById(userId);
        setProfileUser(userData);
        setBioDraft(userData.bio || "");

        const postsData = await getPostsByUser(userId);
        setUserPosts(postsData);
      } catch {
        toast.error("Failed to load profile or posts");
      } finally {
        setLoadingProfile(false);
        setLoadingPosts(false);
      }
    };

    fetchUserProfileAndPosts();
  }, [userId]);

  const canEdit = currentUser?._id === profileUser?._id;

  const handleBioSave = async () => {
    if (bioDraft.trim() === (profileUser.bio || "").trim()) {
      setEditingBio(false);
      return;
    }
    setUpdatingBio(true);
    try {
      const updatedUser = await updateUserById(profileUser._id, { bio: bioDraft.trim() });
      setProfileUser(updatedUser);
      setEditingBio(false);
      toast.success("Bio updated!");
    } catch {
      toast.error("Failed to update bio");
    } finally {
      setUpdatingBio(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <span className="loading loading-spinner loading-lg text-orange-500"></span>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-orange-500 px-4">
        <h2 className="text-3xl font-bold mb-4">User not found</h2>
        <p className="text-center max-w-sm">Please check the URL or try again later.</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-12 px-4 md:px-12"
      style={{ backgroundColor: DARK_BG }}
    >
      <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl p-8 md:p-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Sidebar / Profile Info */}
        <aside className="flex flex-col items-center md:items-start">
          {/* Profile Picture */}
          {profileUser.profilePic ? (
            <img
              src={profileUser.profilePic}
              alt={`${profileUser.firstName} ${profileUser.lastName}`}
              className="w-40 h-40 rounded-full object-cover shadow-lg mb-6"
              loading="lazy"
            />
          ) : (
            <div
              className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center font-extrabold text-5xl shadow-lg mb-6"
              aria-label={getInitials(profileUser.firstName, profileUser.lastName)}
              title={`${profileUser.firstName} ${profileUser.lastName || ""}`}
            >
              {getInitials(profileUser.firstName, profileUser.lastName)}
            </div>
          )}
          {/* Name & Title */}
          <h1 className="text-4xl font-bold leading-tight">{profileUser.firstName} {profileUser.lastName}</h1>
          <p className="mt-2 text-orange-400 font-semibold text-lg">{profileUser.title || "Member of LinkNest"}</p>

          {/* Bio */}
          <section className="mt-8 w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-orange-400 mb-3 border-b border-orange-400 pb-1">About</h2>
            {!editingBio ? (
              <div className="whitespace-pre-wrap text-gray-300 min-h-[96px] border border-white/20 rounded-lg p-4 bg-white/10">
                {profileUser.bio || (
                  <em className="text-gray-500">
                    {canEdit ? "You have not added a bio yet. Click Edit to add." : "This user has not added a bio yet."}
                  </em>
                )}
              </div>
            ) : (
              <textarea
                className="w-full h-24 p-3 rounded-lg border border-orange-500 bg-black/50 text-white resize-y focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={bioDraft}
                onChange={(e) => setBioDraft(e.target.value)}
                maxLength={500}
                disabled={updatingBio}
                placeholder="Tell us about yourself..."
              />
            )}

            {canEdit && (
              <div className="mt-3 flex gap-3">
                {!editingBio ? (
                  <button
                    type="button"
                    onClick={() => setEditingBio(true)}
                    className="btn bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                  >
                    {profileUser.bio ? "Edit Bio" : "Add Bio"}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleBioSave}
                      disabled={updatingBio || !bioDraft.trim()}
                      className="btn bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-60"
                    >
                      {updatingBio ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBioDraft(profileUser.bio || "");
                        setEditingBio(false);
                      }}
                      className="btn bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </section>
        </aside>

        {/* Main content / Posts */}
        <main className="md:col-span-2">
          <h2 className="text-3xl font-bold mb-6 border-b border-orange-400 pb-2 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
            Posts by {profileUser.firstName}
          </h2>

          {loadingPosts ? (
            <div className="flex justify-center py-20">
              <span className="loading loading-spinner loading-xl text-orange-400"></span>
            </div>
          ) : userPosts.length === 0 ? (
            <p className="text-gray-400 italic text-center py-16">No posts to display.</p>
          ) : (
            <div className="space-y-8">
              {userPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg transition hover:shadow-xl"
                >
                  <p className="text-white whitespace-pre-wrap">{post.content}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-400 italic">
                    <time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleString()}</time>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
