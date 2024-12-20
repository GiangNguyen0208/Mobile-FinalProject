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
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </NativeRouter>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
