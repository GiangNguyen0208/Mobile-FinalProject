import axiosInstance from "./axiosInstance";


export const register = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data;
};

export const addComment = async (userData) => {
  const response = await axiosInstance.post("/comments/add", userData);
  return response.data;
};

export const getUserProfile = async (id) => {
  const response = await axiosInstance.get(`/users/findId/${id}`);
  return response.data;
};

export const updateUserProfile = async (id,userData) => {
  const response = await axiosInstance.put(`/users/${id}`,userData);
  return response;
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
export const getListVoucher = async () => {
  try {
    const response = await axiosInstance.get(`/vouchers/listVoucher`);
    return response.data;
  } catch (error) {
    console.error("Error fetching voucher list:", error);
    throw error;
  }
};

export const getListNotification = async () => {
  try {
    const response = await axiosInstance.get(`/notifications/listNotification`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications list:", error);
    throw error; // Để xử lý lỗi nếu cần
  }
};

// export default userApi;