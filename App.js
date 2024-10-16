import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './view/client/layout/default';
import Login from './view/client/pages/login';

// Create a Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    // <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Default" component={Default} />
          <Stack.Screen name="login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    // </AuthProvider>/
  );
}

export default App;