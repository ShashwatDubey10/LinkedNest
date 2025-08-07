import axios from "./index";

export const getUserById = async (userId) => {
  const response = await axios.get(`/users/${userId}`);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get("/users/me", { withCredentials: true });
  return response.data;
};

export const updateUserById = async (userId, updatedData) => {
  const response = await axios.put(`/users/${userId}`, updatedData, { withCredentials: true });
  return response.data;
};

export const searchUsers = async (query) => {
  const response = await axios.get(`/users/search?query=${encodeURIComponent(query)}`);
  return response.data;
};
