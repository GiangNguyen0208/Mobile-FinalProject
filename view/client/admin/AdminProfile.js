import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation

const AdminProfile = () => {
    const adminData = {
        name: 'Admin Name',
        email: 'admin@example.com',
        role: 'Administrator',
        profilePicture: 'https://via.placeholder.com/150',
    };

    const navigation = useNavigation(); // Sử dụng useNavigation để lấy navigation

    const handleEditProfile = () => {
        navigation.navigate("EditProfile"); // Điều hướng đến trang EditProfile
    };

    const handleSetting = () => {
        navigation.navigate('Setting'); // Điều hướng đến trang EditProfile
    };

    return (

        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image source={{uri: adminData.profilePicture}} style={styles.profilePicture}/>
                <Text style={styles.name}>{adminData.name}</Text>
                <Text style={styles.email}>{adminData.email}</Text>
                <Text style={styles.role}>{adminData.role}</Text>
            </View>
            <View style={styles.container2}>
                <View style={styles.avatarContainer}>

                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Tên: </Text>
                    <Text style={styles.infor}>ADMIN</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Email: </Text>
                    <Text style={styles.infor}>ADMIN@mail.com</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Số điện thoại: </Text>
                    <Text style={styles.infor}>0865677047</Text>
                </View>


            </View>


            <View style={styles.body}>
                <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleSetting}>
                    <Text style={styles.buttonText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    infor: {
        top: 5,
        left: 10,
        fontWeight:'700'
    },
    container: {
        flexGrow: 1,
        padding: 36,

        width: 600
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
        backgroundColor: '#e74c3c',
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
    container2: {
        flex: 1,
        padding: 20,

    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#ddd',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        width: 120,
        marginBottom: 60
    },
    value: {
        fontSize: 18,
        color: '#555',
    },
});

export default AdminProfile;
