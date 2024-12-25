import { useState } from "react";
import { authApi } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";


const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (credential) => {
        try {
            const response = await authApi.login(credential);
            await AsyncStorage.setItem("access_token", response.data.token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Login Failed.!", error);
            throw error;
        }
    }

    const logout = async () => {
        try {
            await authApi.logout();
            await AsyncStorage.removeItem("access_token");
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout Failed.!", error)
        }
    };

    return { isAuthenticated, login, logout };
};

export default useAuth;