// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, checkAuth } from "../api/auth";
import { toast } from "react-hot-toast";
import { useAuth } from "../App";

const ORANGE = "#f37021";
const DEEP_ORANGE = "#d14b00";
const DARK_BG = "#0a0a0b";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form);
      const userData = await checkAuth();
      setUser(userData);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden px-4"
      style={{
        background: `linear-gradient(135deg, ${DARK_BG} 0%, #1a1a2e 25%, #16213e 50%, #0f172a 75%, ${DARK_BG} 100%)`,
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
            background: `radial-gradient(circle, #1e40af 0%, #3b82f6 70%, transparent 100%)`,
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
            background: `linear-gradient(45deg, ${ORANGE}, transparent, #1e40af)`,
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            top: "40%",
            left: "60%",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Login Card */}
      <div className="card max-w-md mx-auto mt-20 shadow-2xl border border-orange-400 bg-white/10 backdrop-blur-xl rounded-2xl p-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="avatar mb-6 scale-105 hover:scale-110 transition transform cursor-pointer">
            <div className="w-32 h-32 rounded-full ring ring-orange-400 ring-offset-white ring-offset-2 bg-white flex items-center justify-center shadow-lg">
              <img
                src="/logo.png"
                alt="LinkNest Logo"
                className="object-contain w-28 h-28"
                draggable={false}
              />
            </div>
          </div>
          <h2
            className="text-3xl font-extrabold text-center mb-2"
            style={{
              color: ORANGE,
              textShadow: "0 2px 12px rgba(243, 112, 33, 0.3)",
              letterSpacing: "1.2px",
            }}
          >
            Welcome Back to LinkNest
          </h2>
          <p className="text-neutral-300 text-center font-medium">
            Sign in to connect and share with your network
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 font-semibold text-orange-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              required
              placeholder="your@email.com"
              className="input input-bordered w-full border-orange-400 focus:ring-orange-400 focus:outline-none bg-white/20 text-white"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 font-semibold text-orange-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              placeholder="Enter your password"
              className="input input-bordered w-full border-orange-400 focus:ring-orange-400 focus:outline-none bg-white/20 text-white"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg transition transform duration-300 hover:scale-105 ${
              loading ? "loading" : ""
            }`}
            style={{ letterSpacing: "1.2px" }}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>

      {/* Keyframe Animations */}
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
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 25s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LoginPage;
