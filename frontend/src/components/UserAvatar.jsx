import React from "react";

const getInitials = (firstName, lastName) => {
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
  if (firstName) return firstName[0].toUpperCase();
  return "";
};

const UserAvatar = ({
  user,
  size = 40,
  className = "font-bold",
  bgGradient = "from-orange-500 to-orange-700",
}) => {
  const initials = getInitials(user?.firstName || "", user?.lastName || "");
  if (user?.profilePic) {
    return (
      <img
        src={user.profilePic}
        alt={`${user.firstName || ""} ${user.lastName || ""}`}
        style={{ width: size, height: size }}
        className={`object-cover rounded-full ${className}`}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className={`flex items-center justify-center rounded-full text-white bg-gradient-to-br ${bgGradient} shadow-lg ${className}`}
      style={{ width: size, height: size, fontSize: size / 2 }}
      aria-label={initials}
    >
      {initials}
    </div>
  );
};

export default UserAvatar;
