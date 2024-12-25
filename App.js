import React from 'react';
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
}
