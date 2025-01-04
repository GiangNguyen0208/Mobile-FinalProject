import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../../../constants/theme";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { loginApi } from "../../../../api/authApi";
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const Login = ({ setIsPrivateRoutes }) => {
    const [isPasswordShown, setIsPasswordShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigation = useNavigation();

    const [displayedText, setDisplayedText] = useState(""); // Dùng để hiển thị chữ từng chữ một
    const fullText = "Welcome to Best Food App";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayedText((prevText) => prevText + fullText[index]);
            index += 1;
            if (index === fullText.length) clearInterval(interval);
        }, 200);

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    const handleLogin = async () => {
        setLoading(true);

        const userLogin = {
            username: username,
            password: password,
        };

        try {
          const data = await loginApi(userLogin); // Gọi API đăng nhập
      
          if (data.code === 1000 && data.result.token) {
            console.log("Login successful:", data);
      
            login(data);
            switch (data.result.role) {
                case 'ADMIN':
                    navigation.replace("Admin");
                    break;
                case 'Shop':
                    navigation.replace("ShopOwner");
                    break;
                case 'USER':
                    navigation.replace("BottomTabNavigation");
                    break;
                default:
                    alert("Login failed! Check your username and password.");
                    break;
            }
          } else {
            alert("Login failed! Check your username and password.");
          }
        } catch (error) {
            alert("Login failed! Check your username and password.");
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header Image */}
            <View style={styles.headerImageContainer}>
                <Image
                    source={require("../../../../assets/Vector 1.png")}
                    style={styles.headerImage}
                    resizeMode="contain"
                />
                {/* Đây là phần chứa văn bản trên hình */}
                <Text style={styles.welcomeTextAboveImage}>{displayedText}</Text>
            </View>

            {/* Welcome Section */}
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Hello</Text>
                <Text style={styles.subWelcomeText}>Sign in to your account.</Text>
            </View>

            {/* Username Input */}
            <View style={styles.inputContainer}>
                <Image source={require("../../../../assets/icons8-user-30.png")} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter username"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
                <Image source={require("../../../../assets/icons8-lock-30.png")} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter password"
                    secureTextEntry={!isPasswordShown}
                />
                <TouchableOpacity onPress={() => setIsPasswordShow(!isPasswordShown)}>
                    <Ionicons name={isPasswordShown ? "eye" : "eye-off"} size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <Button
                title={loading ? "Signing in..." : "Sign In"}
                onPress={handleLogin}
                style={styles.signInButton}
                disabled={loading}
            />

            {/* Sign Up Section */}
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpPrompt}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.signUpText}>Create</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.lightGray,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    headerImageContainer: {
        alignItems: "center",
        marginTop: -130,
        position: "relative",
    },
    headerImage: {
        width: "100%",
        height: 350,
    },
    welcomeTextAboveImage: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.primary,
        textAlign: "center",
        marginTop: 20, // Đặt dòng chữ dưới ảnh
        textShadowColor: '#000', // Màu bóng chữ
        textShadowOffset: { width: 1, height: 1 }, // Điều chỉnh hướng bóng
        textShadowRadius: 10, // Độ mờ của bóng
    },
    welcomeContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    welcomeText: {
        color: COLORS.primary,
        fontSize: 32,
        fontWeight: "bold",
    },
    subWelcomeText: {
        fontSize: 16,
        color: COLORS.darkGray,
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 30,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    inputIcon: {
        width: 24,
        height: 24,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        color: COLORS.darkGray,
    },
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginVertical: 10,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: COLORS.primary,
        textDecorationLine: "underline",
    },
    signInButton: {
        marginVertical: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingVertical: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    signInButtonText: {
        fontSize: 18,
        color: COLORS.white,
        fontWeight: "bold",
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    signUpPrompt: {
        fontSize: 16,
        color: COLORS.darkGray,
    },
    signUpText: {
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: "bold",
        marginLeft: 5,
    },
});



export default Login;
