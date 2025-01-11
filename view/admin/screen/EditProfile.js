import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';


const EditAdminProfile = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        createAt: new Date(),
        password: '',
    });

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || formData.createAt;
        setShowDatePicker(false);
        setFormData((prevData) => ({ ...prevData, createAt: currentDate }));
    };

    const handleSave = () => {
        // Xử lý lưu thông tin
        Alert.alert('Profile Saved', `Firstname: ${formData.firstname}\nLastname: ${formData.lastname}\nPhone: ${formData.phone}\nPassword: ${formData.password}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Admin Profile</Text>

            <Text style={styles.label}>First Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter first name"
                value={formData.firstname}
                onChangeText={(value) => handleInputChange('firstname', value)}
            />

            <Text style={styles.label}>Last Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter last name"
                value={formData.lastname}
                onChangeText={(value) => handleInputChange('lastname', value)}
            />

            <Text style={styles.label}>Phone</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
            />

            <Text style={styles.label}>Created At</Text>
            <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)}>
                <Text>{formData.createAt.toDateString()}</Text>
            </TouchableOpacity>


            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
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
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    datePicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditAdminProfile;
