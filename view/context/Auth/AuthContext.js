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
  const [token, setToken] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
          setIsLoggedIn(true);
          setIsPrivate(false);
        }
      } catch (error) {
        console.error("Error reading token from AsyncStorage:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (newToken) => {
    await AsyncStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
    setIsPrivate(false);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsPrivate(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, isPrivate, setIsPrivate }}>
      {children}
    </AuthContext.Provider>
  );
};
