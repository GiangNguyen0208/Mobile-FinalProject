import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from '../view/client/components/Navigation/NavigationBottom.js';
import Login from '../view/client/pages/login/index.js';
import { useAuth } from '../view/context/Auth/AuthContext.js';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();  // Sử dụng useAuth đúng cách

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
            ) : (
              <Stack.Screen name="Login" component={Login} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
        );
        };
export default AppNavigator;
