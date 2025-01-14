import React from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { NavigationContainer } from '@react-navigation/native'; 

import BottomTabNavigation from '../view/client/components/Navigation/NavigationBottom.js'; 
import Login from '../view/client/pages/login/index.js'; 
import Register from '../view/client/pages/register/index.js'; 
import ShopScreen from '../view/shopowner/screen/index.js'; 
import Menu from '../view/shopowner/screen/Menu.js'; 
import EditProduct from '../view/shopowner/screen/EditProduct.js'; 
import Rating from '../view/client/components/ListItem/Rating.js'; 
import VoucherList from '../view/client/components/ListItem/VoucherList.js'; 
import Notification from '../view/client/components/ListItem/Notifications.js'; 
import AdminScreen from '../view/admin/screen/AdminScreen.js';
import ProductDetail from '../view/client/pages/detail/detail.js';
import AddProduct from '../view/shopowner/screen/AddProduct.js';
import AddNotification from '../view/shopowner/screen/AddNotification.js';
import AddVoucher from '../view/shopowner/screen/AddVoucher.js';
import EditProfile from '../view/shopowner/screen/EditProfile.js';
import DetailProductShopScreen from '../view/shopowner/screen/DetailProduct.js';

const Stack = createNativeStackNavigator();
const ShopStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();

// Shop Navigator
const ShopNavigator = () => (
  <ShopStack.Navigator screenOptions={{ headerShown: false }}>
    <ShopStack.Screen name="ShopHome" initialParams={{ shopId: 4 }}  component={ShopScreen} />
    <ShopStack.Screen name="Menu" component={Menu} />
    <ShopStack.Screen name="EditProduct" component={EditProduct} />
    <ShopStack.Screen name="Rating" component={Rating} />
    <ShopStack.Screen name="AddProduct" component={AddProduct} />
    <ShopStack.Screen name="DetailProductShopScreen" component={DetailProductShopScreen} />
    <ShopStack.Screen name="Notification" component={Notification} />
    <ShopStack.Screen name="AddNotification" component={AddNotification} />
    <ShopStack.Screen name="AddVoucher" component={AddVoucher} />
    <ShopStack.Screen name="VoucherList" component={VoucherList} />
    <ShopStack.Screen name="EditProfile" component={EditProfile} />
  </ShopStack.Navigator>
);

// User Navigator
const UserNavigator = () => (
  <UserStack.Navigator screenOptions={{ headerShown: false }}>
    <UserStack.Screen name="UserHome" component={BottomTabNavigation} />
    <UserStack.Screen name="ProductDetail" component={ProductDetail} />
  </UserStack.Navigator>
);

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
              <Stack.Screen name="Shop" component={ShopNavigator} />
              
            )}
            {role === 'USER' && (
              <Stack.Screen name="User" component={UserNavigator} />
            )}
          </>
        ) : (
          <>

            {/* <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} /> */}
            {/* <Stack.Screen name="ShopOwner" initialParams={4} component={ShopScreen} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
            <Stack.Screen name="Rating" component={Rating} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
             */}

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
