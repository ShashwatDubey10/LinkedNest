import React, { useEffect, useState, useRef } from "react";
import { getAllPosts, createPost } from "../api/posts";
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
const ACCENT_BLUE = "#1e40af";

const HomePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef();
  const [postText, setPostText] = useState("");
  const [posting, setPosting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getAllPosts();
      setPosts(data);
    } catch (err) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!postText.trim()) return;
    setPosting(true);

    try {
      await createPost({ content: postText.trim() });
      setPostText("");
      await fetchPosts(); 
      toast.success("Post published!");
    } catch (err) {
      toast.error("Failed to post");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${DARK_BG} 0%, #1a1a2e 25%, #16213e 50%, #0f172a  75%, ${DARK_BG} 100%)`,
      }}
    >
      {/* Animated blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute animate-float opacity-20"
          style={{
            background: `radial-gradient(circle, ${ORANGE} 0%, ${DEEP_ORANGE} 70%, transparent 100%)`,
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            top: "-15%",
            left: "-10%",
            filter: "blur(120px)",
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute animate-float-delayed opacity-15"
          style={{
            background: `radial-gradient(circle, ${ACCENT_BLUE} 0%, #3b82f6 70%, transparent 100%)`,
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            bottom: "-10%",
            right: "-5%",
            filter: "blur(100px)",
            animation: "float-delayed 25s ease-in-out infinite",
          }}
        />
        <div
          className="absolute animate-pulse opacity-5"
          style={{
            background: `linear-gradient(45deg, ${ORANGE}, transparent, ${ACCENT_BLUE})`,
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            top: "40%",
            left: "60%",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-8 max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <h1
            className="text-6xl md:text-7xl font-black mb-6"
            style={{
              background: `linear-gradient(135deg, ${ORANGE} 0%, #fbbf24 50%, ${ORANGE} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 60px rgba(243, 112, 33, 0.3)",
              letterSpacing: "-0.02em",
            }}
          >
            Welcome to LinkNest
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Connect, share and grow with your network in the most beautiful way.
          </p>
          {user && (
            <div className="mt-8 inline-flex items-center gap-4 bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-orange-300/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg">
                {getInitials(user.firstName, user.lastName) || "U"}
              </div>
              <span className="text-white text-lg font-semibold">
                Welcome back, {user.firstName}! 👋
              </span>
            </div>
          )}
        </div>

        {/* Post Creation Box */}
        <form onSubmit={handlePost} className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {getInitials(user?.firstName, user?.lastName) || "U"}
              </div>
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  placeholder="What's on your mind? Share something amazing..."
                  className="w-full bg-white/5 backdrop-blur-xl text-white placeholder-slate-400 border-0 rounded-2xl p-6 text-lg leading-relaxed resize-none min-h-[100px] focus:ring-2 focus:ring-orange-400/50 focus:bg-white/10 transition-all duration-300 shadow-inner"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
                    borderRadius: "20px",
                    boxShadow:
                      "inset 0 2px 10px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.1)",
                  }}
                  maxLength={600}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  disabled={posting}
                />
                <div className="absolute inset-0 rounded-2xl border border-gradient-to-r from-orange-400/10 via-transparent to-blue-400/10 pointer-events-none"></div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={posting || !postText.trim()}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {posting ? "Posting..." : "Post"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Posts Feed Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          <div className="p-8 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-orange-600"></div>
                Latest Updates
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                Live
              </div>
            </div>
          </div>
          <div className="max-h-[700px] overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-orange-300/30 border-t-orange-400 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-l-blue-400/50 rounded-full animate-spin animate-reverse"></div>
                </div>
                <p className="mt-4 text-slate-400 font-medium">Loading amazing content...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400/20 to-blue-400/20 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-orange-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Start the Conversation</h3>
                <p className="text-slate-400 max-w-sm mx-auto">
                  Be the first to share something amazing with the community. Your voice matters!
                </p>
              </div>
            ) : (
              <div className="p-8 space-y-6">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="flex items-start gap-4 border-b border-white/10 pb-6 last:border-0"
                  >
                    {post.author?.profilePic ? (
                      <img
                        src={post.author.profilePic}
                        alt={`${post.author.firstName || ""} ${post.author.lastName || ""}`}
                        className="w-12 h-12 rounded-full object-cover shadow-md"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-full text-white bg-gradient-to-br from-orange-400 to-orange-700 font-bold shadow-md"
                        aria-label={getInitials(post.author?.firstName, post.author?.lastName)}
                        title={`${post.author?.firstName || ""} ${post.author?.lastName || ""}`}
                      >
                        {getInitials(post.author?.firstName, post.author?.lastName)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-white font-semibold text-lg">
                        <span>{post.author?.firstName} {post.author?.lastName || ""}</span>
                        <span className="text-sm text-slate-400">{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-1 text-slate-200 whitespace-pre-wrap">{post.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-40px, -20px) rotate(-120deg); }
          66% { transform: translate(20px, 30px) rotate(-240deg); }
        }
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
