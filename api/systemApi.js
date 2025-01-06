import axiosInstance from "./axiosInstance";

export const getAllProduct = async () => {
    const response = await axiosInstance.get("/products/listProduct");
    return response.data;
};

export const getAllCategory = async () => {
    const response = await axiosInstance.get("/users/categories");
    return response.data;
};
