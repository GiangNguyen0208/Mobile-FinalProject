import axiosInstance from "./axiosInstance";

export const getAllUser = async () => {
    const response = await axiosInstance.get("/users/getAllUser");
    return response.data;
}