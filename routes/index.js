import React from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from '../view/client/components/Navigation/NavigationBottom.js';
import Login from '../view/client/pages/login/index.js';
import Register from '../view/client/pages/register/index.js';
import { useAuth } from '../view/context/Auth/AuthContext.js';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ isLoggedIn, role }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {isLoggedIn ? (
          <>
            {role === 'ADMIN' && (
              <Stack.Screen name="Admin" component={AdminScreen} />
            )}
            {role === 'Shop' && (
              <Stack.Screen name="ShopOwner" component={ShopScreen} />
            )}
            {role === 'USER' && (
              <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
            )}
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )} */}
        <Stack.Screen name="ShopOwner" initialParams={{ id: 4 }} component={ShopScreen} />
        <Stack.Screen name="Menu"  component={ShopMenu} />
        {/* <Stack.Screen name="ShopOwner" component={ShopScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
