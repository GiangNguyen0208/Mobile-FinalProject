

import React from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import BottomTabNavigation from '../view/client/components/Navigation/NavigationBottom.js'; 
import Login from '../view/client/pages/login/index.js'; 
import Register from '../view/client/pages/register/index.js'; 
import { NavigationContainer } from '@react-navigation/native'; 
import ShopScreen from '../view/shopowner/screen/index.js'; 
import Menu from '../view/shopowner/screen/Menu.js'; 
import EditProduct from '../view/shopowner/screen/EditProduct.js'; 
import Rating from '../view/client/components/ListItem/Rating.js'; 

import AdminScreen from '../view/admin/screen/AdminScreen.js';
import ProductDetail from '../view/client/pages/detail/detail.js';

const Stack = createNativeStackNavigator();

const AppNavigator = ({ isLoggedIn, role }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            {role === 'ADMIN' && (
              <Stack.Screen name="Admin" component={AdminScreen} />
            )}
            {role === 'Shop' && (
              <Stack.Screen name="ShopOwner" component={ShopScreen} />
            )}
            {role === 'USER' && (
              <Stack.Screen name="User" component={BottomTabNavigation} />
            )}
          </>
        ) : (
          <>
            {/* <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} /> */}
            <Stack.Screen name="ShopOwner" initialParams={4} component={ShopScreen} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
            <Stack.Screen name="Rating" component={Rating} />
          </>
        )}
        <Stack.Screen name="ProductDetail" component={ProductDetail}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;