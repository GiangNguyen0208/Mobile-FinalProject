import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const UserSettings = () => {
    const [username, setUsername] = useState('JohnDoe');
    const [email, setEmail] = useState('john@example.com');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('123 Main St, City, Country');

    const handleSaveSettings = () => {
        const userSettings = {
            username,
            email,
            password,
            address,
        };
        console.log('User Settings:', userSettings);
        // Save to backend or local storage
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>User Settings</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter username"
                value={username}
                onChangeText={setUsername}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter address"
                value={address}
                onChangeText={setAddress}
            />
            <Button title="Save Settings" onPress={handleSaveSettings} color="#e74c3c"/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 16, marginVertical: 5 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
});

export default UserSettings;
