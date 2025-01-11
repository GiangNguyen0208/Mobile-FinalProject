import axiosInstance from "./axiosInstance";

export const register = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data;
};

export const getUserProfile = async (id) => {
  const response = await axiosInstance.get("/users", id);
  return response.data;
};

export const updateUserProfile = async (id) => {
  const response = await axiosInstance.put("/users", id);
  return response.data;
};



export default userApi;