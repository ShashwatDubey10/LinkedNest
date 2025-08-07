import axios from "./index";

export const register = async (userData) => {
  const response = await axios.post("/auth/signup", userData, {
    withCredentials: true,
  });
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post("/auth/login", credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post("/auth/logout", null, {
    withCredentials: true,
  });
  return response.data;
};

export const checkAuth = async () => {
  const response = await axios.get("/auth/check", {
    withCredentials: true,
  });
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put("/auth/update-profile", profileData, {
    withCredentials: true,
  });
  return response.data;
};
