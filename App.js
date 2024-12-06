import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeRouter, Router } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AllRoutes } from './view/client/components/AllRoutes'; 
import { AuthProvider } from './view/context/Auth/AuthContext';


export default function App() {
  return (
    <SafeAreaProvider> 
      <NativeRouter>
        <NavigationContainer>
          <AuthProvider>
            <AllRoutes />
          </AuthProvider>
        </NavigationContainer>
      </NativeRouter>
    </SafeAreaProvider>
  );
}
