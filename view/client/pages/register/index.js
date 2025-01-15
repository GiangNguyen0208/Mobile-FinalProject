import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import COLORS from "../../../../constants/theme";
import Button from "../../components/Button/Button";
import { register } from '../../../../api/authApi';

const Register = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [formValid, setFormValid] = useState(false);

    // useEffect to validate form
    useEffect(() => {
        const isValid = userName && phoneNumber && firstname && lastname && password && passwordConfirm && email && password === passwordConfirm;
        setFormValid(isValid);
    }, [userName, phoneNumber, firstname, lastname, email, password, passwordConfirm]);

    const handleSignUp = async () => {
        if (!formValid) {
            alert("Error", "Vui lòng điền đầy đủ thông tin và đảm bảo mật khẩu khớp.");
            return;
        }

        // Dữ liệu cần gửi
        const userData = {
            userName,
            email,
            phoneNumber,
            firstname,
            lastname,
            password,
        };

        try {
            const response = await register(userData);
            if (response.ok) {
                alert("Success", `Account created for ${response.result.firstname} ${response.result.lastname}`);
                navigation.navigate("Login");
            } else {
                alert("Error", response.message || "Something went wrong.");
            }
        } catch (error) {
            alert("Error", "Failed to connect to the server.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../../../../assets/Vector 1.png")}
                    style={styles.headerImage}
                />
                <Text style={styles.title}>Register</Text>
                <Text style={styles.subtitle}>Create your account</Text>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First name"
                    value={firstname}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last name"
                    value={lastname}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={userName}
                    onChangeText={setUserName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone number"
                    value={phoneNumber}
                    keyboardType="number-pad"
                    onChangeText={setPhoneNumber}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    secureTextEntry
                    onChangeText={setPasswordConfirm}
                />
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Sign up"
                    onPress={handleSignUp}
                    disabled={!formValid} // Disable the button if form is invalid
                />
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.signInLink}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerImage: {
        width: 380,
        height: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
        marginVertical: 5,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.gray,
    },
    formContainer: {
        marginVertical: 10,
    },
    input: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 14,
        marginBottom: 10,
        elevation: 2,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    signInLink: {
        marginTop: 10,
        fontSize: 14,
        color: COLORS.primary,
        textDecorationLine: 'underline',
    },
});

export default Register;
