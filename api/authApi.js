import axiosInstance from "./axiosInstance";

export const loginApi = async ({username, password}) => {
    try {
        const response = await axiosInstance.post("/auth/token", { username, password });
        return response.data;
    } catch (error) {
        console.error("Login API Error", error); // Log error chi tiết
        throw error;
    }
};

export const introspectApi = async (token) => {
    try {
        const response = await axiosInstance.post("/auth/introspect", token);
        return response.data;
    } catch (error) {
        console.error("Register API Error", error); // Log error chi tiết
        throw error;
    }
};
