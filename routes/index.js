import React from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from '../view/client/components/Navigation/NavigationBottom.js';
import Login from '../view/client/pages/login/index.js';
import Register from '../view/client/pages/register/index.js';
import { useAuth } from '../view/context/Auth/AuthContext.js';
import { NavigationContainer } from '@react-navigation/native';
import DefaultAdmin from '../view/admin/layout/default.js';
import DefaultShop from '../view/shopowner/layout/default.js';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn, role } = useAuth(); // Lấy trạng thái đăng nhập từ context

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
          {role === 'ADMIN' && (
            <Stack.Screen 
              name="Admin" 
              component={DefaultAdmin} 
            />
          )}
          {role === 'Shop' && (
            <Stack.Screen 
              name="ShopOwner" 
              component={DefaultShop} 
            />
          )}
          {role === 'USER' && (
            <Stack.Screen 
              name="BottomTabNavigation" 
              component={BottomTabNavigation} 
            />
          )}
        </>
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
