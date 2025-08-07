import axios from "./index";

export const getAllPosts = async () => {
  const response = await axios.get("/posts");
  return response.data;
};

export const createPost = async (content) => {
  const response = await axios.post("/posts", content);
  return response.data;
};

export const getPostsByUser = async (userId) => {
  const response = await axios.get(`/posts/user/${userId}`);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`/posts/${postId}`);
  return response.data;
};

export const updatePost = async (postId, updatedContent) => {
  const response = await axios.put(`/posts/${postId}`, updatedContent);
  return response.data;
};
