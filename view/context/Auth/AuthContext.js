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
  const [userId, setUserId] = useState(null); // Lưu ID
  const [shopId, setShopId] = useState(null);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
         const savedRole = await AsyncStorage.getItem("role");
         const savedUserId = await AsyncStorage.getItem("userId");
         const saveShopId = await AsyncStorage.getItem("shopId");

        // console.log("Saved role:", savedRole);

        if (savedToken) {
          setToken(savedToken);
          setRole(savedRole);
          setUserId(savedUserId ? JSON.parse(savedUserId) : null);
          setShopId(saveShopId ? JSON.parse(saveShopId) : null);
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
      const newToken = data.result.token;
      const updateRole = data.result.clientType;
      const userId = data.result.userId;
      const shopId = data.result.shopId;

      await AsyncStorage.setItem("token", newToken);
      await AsyncStorage.setItem("role", updateRole);
      await AsyncStorage.setItem("userId", JSON.stringify(userId));
      await AsyncStorage.setItem("shopId", JSON.stringify(shopId));

      setToken(newToken);
      setRole(updateRole);
      setUserId(userId);
      setShopId(shopId);
      setIsLoggedIn(true);
      setIsPrivate(false);

    } catch (error) {
      console.error("Error saving token to AsyncStorage:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("shopId");

      setIsLoggedIn(false);
      setIsPrivate(true);
      setRole(null);
      setUserId(null);
      setShopId(null);
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  };

  const resetAuth = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("shopId");

      setIsLoggedIn(false);
      setIsPrivate(true);
      setRole(null);
      setUserId(null);
      setShopId(null);
      console.log("Đã xóa token và đặt lại trạng thái đăng nhập.");
    } catch (error) {
      console.error("Không thể xóa token:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, role, token, resetAuth, userId, shopId  }}>
      {children}
    </AuthContext.Provider>
  );
};