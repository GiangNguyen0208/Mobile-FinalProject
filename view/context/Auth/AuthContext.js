import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tạo context
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // Lưu role
  const [token, setToken] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        // const savedRole = await AsyncStorage.getItem("role");

        // console.log("Saved role:", savedRole);

        if (savedToken) {
          setToken(savedToken);
          // setRole(savedRole);
          setIsLoggedIn(true); 
          setIsPrivate(false);
        } else {
          setIsLoggedIn(false);
          setIsPrivate(true);
        }
      } catch (error) {
        console.error("Error reading token from AsyncStorage:", error);
      }
    };

    checkLoginStatus();
  }, []); // Chỉ chạy một lần khi ứng dụng khởi động

  const login = async (data) => {
    try {
      console.log("Check call api:", data);
      const newToken = data.result.token;
      const updateRole = data.result.clientType;

      console.log("Saved role Update:", updateRole);

      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("role", updateRole);

      setToken(newToken);
      setRole(updateRole);  // Cập nhật role ngay lập tức
      setIsLoggedIn(true);
      setIsPrivate(false);

    } catch (error) {
      console.error("Error saving token to AsyncStorage:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
      setIsLoggedIn(false);
      setIsPrivate(true);
      setRole(null);
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  };

  const resetAuth = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem('role');
      setIsLoggedIn(false);
      setIsPrivate(true);
      setRole(null);
      console.log("Đã xóa token và đặt lại trạng thái đăng nhập.");
    } catch (error) {
      console.error("Không thể xóa token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role, token, resetAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
