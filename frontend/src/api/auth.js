import axios from "./index";

export const register = async (userData) => {

  const response = await axios.post("/auth/signup", userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post("/auth/logout");
  return response.data;
};

export const checkAuth = async () => {
  const response = await axios.get("/auth/check");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put("/auth/update-profile", profileData);
  return response.data;
};
