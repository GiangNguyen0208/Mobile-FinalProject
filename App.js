<<<<<<< HEAD
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from "./view/screen/Login";
import Register from "./view/screen/Register";
import Verify from "./view/screen/Verify";


const Stack = createStackNavigator();

function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login} // Đảm bảo đây là thành phần hợp lệ
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Register"
                    component={Register} // Đảm bảo đây là thành phần hợp lệ
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Verify"
                    component={Verify} // Đảm bảo đây là thành phần hợp lệ
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );

=======
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeRouter } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './view/context/Auth/AuthContext';
import AppNavigator from './routes';

export default function App() {
  return (
    <SafeAreaProvider> 
      <AuthProvider>
        <NativeRouter>
          <AppNavigator />
        </NativeRouter>
      </AuthProvider>
    </SafeAreaProvider>
  );
>>>>>>> d22a77ba4d1351ffa713c2be823477db3f6a887b
}

export default App;
