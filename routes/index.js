import React from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from '../view/client/components/Navigation/NavigationBottom.js';
import Login from '../view/client/pages/login/index.js';
import Register from '../view/client/pages/register/index.js';
import { useAuth } from '../view/context/Auth/AuthContext.js';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn } = useAuth(); // Lấy trạng thái đăng nhập từ context

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen 
            name="BottomTabNavigation" 
            component={BottomTabNavigation} 
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name='Register' component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
