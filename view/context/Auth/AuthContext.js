import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native'; // Thêm useNavigation

// Tạo context
export const AuthContext = createContext();

// Tạo custom hook useAuth
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component để quản lý trạng thái đăng nhập
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const navigation = useNavigation(); // Khởi tạo navigation

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
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
  }, []);

  // Hàm đăng nhập
  const login = async (data) => {
    try {
      const newToken = data.result.token;
      await AsyncStorage.setItem("token", newToken);
      setToken(newToken);
      setIsLoggedIn(true);
      setIsPrivate(false);
    } catch (error) {
      console.error("Error saving token to AsyncStorage:", error);
    }
  };

  // Hàm đăng xuất và điều hướng đến trang Login
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsPrivate(true);
    } catch (error) {
      console.error("Error removing token from AsyncStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, token, isPrivate }}>
      {children}
    </AuthContext.Provider>
  );
};
