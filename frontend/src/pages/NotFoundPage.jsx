import React from "react";
import { Link } from "react-router-dom";

const ORANGE = "#f37021";
const DEEP_ORANGE = "#d14b00";
const DARK_BG = "#0a0a0b";

const NotFoundPage = () => {
  return (
    <div
      className="relative min-h-screen overflow-hidden px-4 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${DARK_BG} 0%, #1a1a2e 25%, #16213e 50%, #0f172a 75%, ${DARK_BG} 100%)`,
      }}
      aria-label="404 Not Found Page"
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

      {/* Frosted glass card */}
      <main className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 text-center text-white">
        <h1 className="text-9xl font-extrabold mb-6" style={{ color: ORANGE }}>
          404
        </h1>
        <h2 className="text-3xl font-bold mb-4" style={{ color: DEEP_ORANGE }}>
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
          aria-label="Go to Home page"
        >
          Go Home
        </Link>
      </main>

      {/* Animations */}
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
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
