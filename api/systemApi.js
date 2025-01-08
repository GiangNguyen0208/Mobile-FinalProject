import axiosInstance from "./axiosInstance";

export const getAllProduct = async () => {
    const response = await axiosInstance.get("/products/listProduct");
    return response.data;
};

export const getAllCategory = async () => {
    const response = await axiosInstance.get("/users/categories");
    return response.data;
};

export const getProductsByCategory = async (categoryId) => {
      const response = await axios.get(`/getByCategory/${categoryId}`);
      return response.data.result;
  };
