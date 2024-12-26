import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../../../constants/theme";
import Button from "../../components/Button/Button";
import { AuthContext } from "../../../context/Auth/AuthContext";
import { loginApi } from "../../../../api/authApi"; 
import { useNavigation } from '@react-navigation/native';
import BottomTabNavigation from "../../components/Navigation/NavigationBottom";

const { width } = Dimensions.get("window");

const Login = ({ setIsPrivateRoutes }) => {
    const [isPasswordShown, setIsPasswordShow] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);


    const handleLogin = async () => {
        const navigation = useNavigation();
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
            navigation.replace("BottomTabNavigation");
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
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
    },
    headerImageContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    headerImage: {
        width: width * 1,
        height: 150,
    },
    welcomeContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    welcomeText: {
        color: COLORS.black,
        fontSize: 36,
        fontWeight: "bold",
    },
    subWelcomeText: {
        fontSize: 16,
        color: COLORS.gray,
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.white,
        borderRadius: 20,
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 23,
        elevation: 5,
    },
    inputIcon: {
        width: 24,
        height: 24,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginVertical: 10,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: COLORS.blue,
        textDecorationLine: "underline",
    },
    signInButton: {
        marginVertical: 20,
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    signUpPrompt: {
        fontSize: 16,
        color: COLORS.gray,
    },
    signUpText: {
        fontSize: 16,
        color: COLORS.blue,
        fontWeight: "bold",
        marginLeft: 5,
    },
});

export default Login;
