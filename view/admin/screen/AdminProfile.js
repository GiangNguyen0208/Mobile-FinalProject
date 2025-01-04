import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const AdminProfile = () => {
    const adminData = {
        name: 'Admin Name',
        email: 'admin@example.com',
        role: 'Administrator',
        profilePicture: 'https://via.placeholder.com/150',
    };

    const navigation = useNavigation(); // Sử dụng useNavigation để lấy navigation

    const handleEditProfile = () => {
        navigation.navigate('EditProfile'); // Điều hướng đến trang EditProfile
    };

    const handleSetting = () => {
        navigation.navigate('Setting'); // Điều hướng đến trang EditProfile
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: adminData.profilePicture }} style={styles.profilePicture} />
                <Text style={styles.name}>{adminData.name}</Text>
                <Text style={styles.email}>{adminData.email}</Text>
                <Text style={styles.role}>{adminData.role}</Text>
            </View>

            <View style={styles.body}>
                <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Manage Users</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSetting} >
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 36,

        width:600
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    role: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    body: {
        marginTop: 20,
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

export default AdminProfile;
