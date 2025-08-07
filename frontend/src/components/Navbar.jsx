import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { searchUsers } from "../api/users";
import { logout } from "../api/auth";
import { useAuth } from "../App";
import { debounce } from "lodash";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, setUser } = useAuth() || {};
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef();

  const getInitials = (firstName, lastName) => {
    if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
    if (firstName) return firstName[0].toUpperCase();
    return "U";
  };

  const debouncedSearch = React.useMemo(() =>
    debounce(async (searchTerm) => {
      if (!searchTerm.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const users = await searchUsers(searchTerm.trim());
        setResults(users);
      } catch (error) {
        setResults([]);
        toast.error("Error searching users");
      } finally {
        setLoading(false);
      }
    }, 300)
  , []);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectUser = (userId) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/profile/${userId}`);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Logout failed, please try again");
    }
  };

  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <nav className="bg-black px-8 py-4 w-full shadow flex items-center justify-between">
      {/* Left: Logo + App Name */}
      <div
        className="flex items-center gap-3 select-none cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="h-12 w-12 rounded-full flex items-center justify-center bg-black shadow-lg border-2 border-orange-500">
          <img
            src="/logo1.png"
            alt="LinkNest Logo"
            className="h-8 w-8"
            draggable={false}
            style={{ objectFit: "contain" }}
          />
        </div>
        <span
          className="text-2xl font-bold tracking-tight"
          style={{ color: "#f37021" }}
        >
          LinkNest
        </span>
      </div>

      {/* Center: Search bar hidden on login/register */}
      {!isAuthPage && (
        <div className="relative flex-grow max-w-xl mx-10" ref={searchRef}>
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowDropdown(true);
            }}
            className="w-full rounded-md border border-gray-600 bg-gray-900 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            aria-label="Search users"
          />
          {loading && (
            <div className="absolute top-2 right-3">
              <span className="loading loading-spinner loading-sm text-orange-500" />
            </div>
          )}
          {showDropdown && results.length > 0 && (
            <ul className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-md bg-black text-white shadow-lg ring-1 ring-black ring-opacity-60 focus:outline-none">
              {results.map((resultUser) => (
                <li
                  key={resultUser._id}
                  onClick={() => handleSelectUser(resultUser._id)}
                  className="cursor-pointer px-4 py-2 hover:bg-orange-600 flex items-center gap-3"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSelectUser(resultUser._id);
                    }
                  }}
                >
                  {resultUser.profilePic ? (
                    <img
                      src={resultUser.profilePic}
                      alt={`${resultUser.firstName} ${resultUser.lastName}`}
                      className="h-8 w-8 rounded-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                      {(resultUser.firstName?.[0] || "").toUpperCase()}
                    </div>
                  )}
                  <span>
                    {resultUser.firstName} {resultUser.lastName}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {showDropdown && !loading && query.trim() && results.length === 0 && (
            <div className="absolute z-50 mt-1 w-full rounded-md bg-black py-2 px-4 text-sm text-gray-400 shadow-lg ring-1 ring-black ring-opacity-50">
              No users found
            </div>
          )}
        </div>
      )}

      {/* Right section */}
      <div className="flex items-center gap-6">
        {isAuthPage ? (
          <>
            {location.pathname !== "/login" && (
              <Link
                to="/login"
                className="btn rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg transition transform duration-300 hover:scale-105 px-6 py-2"
              >
                Login
              </Link>
            )}
            {location.pathname !== "/register" && (
              <Link
                to="/register"
                className="btn rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg transition transform duration-300 hover:scale-105 px-6 py-2"
              >
                Register
              </Link>
            )}
          </>
        ) : (
          <>
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigate("/profile/me")}
              title="Go to your profile"
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover border-2 border-orange-500"
                  loading="lazy"
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full font-extrabold text-lg"
                  style={{
                    background: "linear-gradient(135deg, #f37021, #d96400 85%)",
                    color: "white",
                    border: "2px solid #fff",
                  }}
                  aria-label={getInitials(user?.firstName, user?.lastName)}
                >
                  {getInitials(user?.firstName, user?.lastName)}
                </div>
              )}
              <span className="font-semibold text-white whitespace-nowrap">
                {user ? `${user.firstName} ${user.lastName}` : "Guest"}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
              type="button"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
