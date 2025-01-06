import axiosInstance from "./axiosInstance";

export const getAllUser = async () => {
    const response = await axiosInstance.get("/users/getAllUser");
    return response.data;
}
export const getShopById = async (id) => {
    const response = await axiosInstance.get(`/admin/shop/id/${id}`, {
        
    });
    return response.data;
}