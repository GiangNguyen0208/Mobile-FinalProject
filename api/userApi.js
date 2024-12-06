import axiosInstance from "./axiosInstance";

const userApi = {
  getUserInfo: () => axiosInstance.get("users/info"),
  updateUser: (data) => axiosInstance.put("/users/update", data),
};

export default userApi;