import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, TouchableOpacity } from 'react-native';
import COLORS from "../../../../constants/COLORS";
import Button from "../../components/Button/Button";
import Ionicons from "react-native-vector-icons/Ionicons";

const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShow] = useState(false);
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../../../../assets/Vector 1.png")}
                        style={{ bottom: 60, right: 40 }}
                    />
                </View>
            </View>
            <View style={{ flex: 1, position: 'relative', justifyContent: 'center', alignItems: 'center', bottom: 350 }}>
                <Text style={{ color: COLORS.black, fontSize: 100, fontWeight: '500' }}>Hello</Text>
                <Text style={{ top: 10, fontSize: 20, fontWeight: '500' }}>Sign in to your account.</Text>
            </View>
            {/* Username Input */}
            <View style={{ backgroundColor: COLORS.white, position: "relative", bottom: 400, flexDirection: 'row', borderRadius: 20, marginHorizontal: 40, elevation: 10, marginVertical: 20, padding: 20 }}>
                <Image source={require("../../../../assets/icons8-user-30.png")} />
                <TextInput style={{ flex: 1, fontSize: 20, left: 10 }} placeholder="Enter user name" />
            </View>
            {/* Password Input */}
            <View style={{ backgroundColor: COLORS.white, position: "relative", bottom: 400, flexDirection: 'row', borderRadius: 20, marginHorizontal: 40, elevation: 10, marginVertical: 20, padding: 20 }}>
                <Image source={require("../../../../assets/icons8-lock-30.png")} />
                <TextInput style={{ flex: 1, fontSize: 20, left: 10 }} placeholder="Enter password" secureTextEntry={isPasswordShown} />
                <TouchableOpacity onPress={() => setIsPasswordShow(!isPasswordShown)}>
                    <Ionicons name={isPasswordShown ? "eye" : "eye-off"} size={24} color={COLORS.black} />
                </TouchableOpacity>
            </View>
            {/* Forgot Password */}
            <View style={{ position: 'relative', bottom: 400, left: 350 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Forgot your password?</Text>
            </View>
            {/* Sign In Button */}
            <View style={{ position: "absolute", top: 750, left: 300 }}>
                <Button onPress={() => navigation.navigate("Register")} title="Sign in" style={{ left: 120 }} />
            </View>
            {/* Sign Up Text */}
            <View style={{ position: "absolute", top: 770, left: 300 }}>
                <Text style={{ fontSize: 30, fontWeight: 700 }}>Sign up</Text>
            </View>
            <View style={{ position: "absolute", top: 900, left: 200 }}>
                <Text style={{ fontSize: 25, fontWeight: 500, right: 60 }}>Don't have an account?</Text>
                <Pressable onPress={() => navigation.navigate("Register")}>
                    <Text style={{ fontSize: 25, fontWeight: 500, left: 205, bottom: 35, color: COLORS.blue, textDecorationLine: "underline" }}>Create</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Login;
