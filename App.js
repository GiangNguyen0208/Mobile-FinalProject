import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import User from './view/client/admin/AdminScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <User />
    </SafeAreaProvider>
  );
}
