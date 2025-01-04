import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tạo context
export const AuthContext = createContext();

// Tạo custom hook useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component để quản lý trạng thái đăng nhập
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // Lưu role
  const [token, setToken] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
    const checkLoginStatus = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken); // Lưu token nếu đã tồn tại trong AsyncStorage
          setIsLoggedIn(true); // Đặt trạng thái đăng nhập thành true
          setIsPrivate(false); // Đặt quyền truy cập thành không riêng tư
        } else {
          setIsLoggedIn(false); // Nếu không có token, đăng xuất
          setIsPrivate(true); // Quyền truy cập là riêng tư
        }
      } catch (error) {
        console.error("Error reading token from AsyncStorage:", error);
      }
    };

    checkLoginStatus();
  }, []);

  // Hàm đăng nhập
  const login = async (data) => {
    try {
      // Trích xuất token từ phản hồi API
      const newToken = data.result.token;
      const role = data.result.clientType;

      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem("token", newToken);

      // Cập nhật state
      setToken(newToken);
      setIsLoggedIn(true); // Đặt trạng thái đăng nhập thành true
      setIsPrivate(false); // Quyền truy cập thành không riêng tư
      setRole(role);

    } catch (error) {
      console.error("Error saving token to AsyncStorage:", error);
    }
  };

  // Hàm đăng xuất
  const logout = async () => {
    try {
      // Xóa token khỏi AsyncStorage
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false); // Đặt trạng thái đăng nhập thành false
      setIsPrivate(true); // Đặt quyền truy cập thành riêng tư
      setRole(null);
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, isPrivate, role }}>
      {children}
    </AuthContext.Provider>
  );
};
