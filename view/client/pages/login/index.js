// view/client/pages/login/Login.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
// import { useAuth } from '../../context/AuthContext'; // Adjust the path as necessary
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  // const { login } = useAuth(); // Get the login function from context
  const navigation = useNavigation(); // For navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async () => {
  //   if (!username || !password) {
  //     Alert.alert('Please enter both username and password');
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     // Replace with your actual login logic
  //     await login({ username, password }); // Call login function with user data
  //     navigation.navigate('Home'); // Redirect to Home or another screen after login
  //   } catch (error) {
  //     Alert.alert('Login failed', error.message || 'Please try again');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* <Button title={loading ? "Logging in..." : "Login"} onPress={handleSubmit} disabled={loading} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
  },
});