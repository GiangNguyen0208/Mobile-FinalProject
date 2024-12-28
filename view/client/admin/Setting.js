import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Settings = () => {
    const handleChangePassword = () => {
        // Logic thay đổi mật khẩu sẽ được xử lý ở đây
        Alert.alert('Change Password', 'You can change your password here');
    };

    const handleNotificationSettings = () => {
        // Logic cài đặt thông báo sẽ được xử lý ở đây
        Alert.alert('Notification Settings', 'You can manage your notifications here');
    };

    const handleLogout = () => {
        // Logic đăng xuất sẽ được xử lý ở đây
        Alert.alert('Logout', 'You have been logged out');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleNotificationSettings}>
                <Text style={styles.buttonText}>Notification Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Settings;
