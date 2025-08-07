import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { searchUsers } from "../api/users"; 
import { debounce } from "lodash";

const HeaderSearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef();

  const debouncedSearch = React.useMemo(
    () =>
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
        } catch {
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 300), 
    []
  );

  useEffect(() => {
    debouncedSearch(query);


    return () => {
      debouncedSearch.cancel();
    };
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

  return (
    <div className="relative w-64" ref={searchRef}>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        className="w-full rounded-lg border border-gray-300 pl-3 pr-10 py-2 focus:outline-none focus:ring focus:ring-orange-400 bg-white text-black"
      />
      {loading && (
        <div className="absolute top-2 right-3">
          <span className="loading loading-spinner loading-sm text-orange-500"></span>
        </div>
      )}

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-black">
          {results.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSelectUser(user._id)}
              className="cursor-pointer select-none px-4 py-2 hover:bg-orange-100 flex items-center gap-3"
            >
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-500 text-white font-bold">
                  {(user.firstName?.[0] || "").toUpperCase()}
                </div>
              )}
              <span>{user.firstName} {user.lastName}</span>
            </li>
          ))}
        </ul>
      )}

      {showDropdown && !loading && query.trim() && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 px-4 py-2 text-sm text-gray-500">
          No users found
        </div>
      )}
    </div>
  );
};

export default HeaderSearchBar;
