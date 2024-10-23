import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeRouter } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AllRoutes } from './view/client/components/AllRoutes'; 

function App() {
  return (
    <SafeAreaProvider> 
      <NativeRouter>
        <NavigationContainer>
          <AllRoutes /> 
        </NavigationContainer>
      </NativeRouter>
    </SafeAreaProvider>
  );
}

export default App;
