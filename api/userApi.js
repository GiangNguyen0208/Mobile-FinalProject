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

export const getProductCommentList = async (id) => {
  try {
      const response = await axiosInstance.get(`/comments/list/product/${id}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching product comments:", error);
      throw error; // Để xử lý lỗi nếu cần
  }
};

export const getCategoryList = async () => {
  try {
      const response = await axiosInstance.get(`/categories/listCategory`);
      return response.data;
  } catch (error) {
      console.error("Error fetching product comments:", error);
      throw error; // Để xử lý lỗi nếu cần
  }
};

// export default userApi;