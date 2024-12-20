import axios from "axios";
import { Alert } from "react-native";
import Config from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
    baseURL: Config.BASE_URL,
    timeout: Config.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        Alert.alert("Session Expired", "Please log in again.");
        // Có thể điều hướng người dùng tới màn hình đăng nhập
      }
      return Promise.reject(error);
    }
);

export default axiosInstance;