
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
import ProductDetailUser from '../view/client/pages/detail/detail.js';
import ShopDetailUser from '../view/client/pages/shop/ShopDetail.js';
import foodList from '../view/client/components/ListItem/ProductList.js';
import AddProduct from '../view/shopowner/screen/AddProduct.js';
import AddNotification from '../view/shopowner/screen/AddNotification.js';
import AddVoucher from '../view/shopowner/screen/AddVoucher.js';
import EditProfile from '../view/shopowner/screen/EditProfile.js';
import DetailProductShopScreen from '../view/shopowner/screen/DetailProduct.js';
import Cart from '../view/client/pages/Cart/index';
import Pay from '../view/client/pages/payment/payment';
import OrderList from '../view/shopowner/screen/OrderList';
import OrderDetailShop from '../view/shopowner/screen/OrderDetailShop.js';
import EditShopScreen from '../view/admin/screen/EditShopScreen'; // Thêm import EditShopScreen
import DetailOrderUser from '../view/client/components/Order/DetailOrderUser.js';


import Promotion from '../view/client/pages/notifications/promotions.js';
import News from '../view/client/pages/notifications/news.js';
import AddRating from '../view/client/components/ListItem/AddRating.js';

const Stack = createNativeStackNavigator();
const ShopStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

// Shop Navigator
const ShopNavigator = () => (
  <ShopStack.Navigator screenOptions={{ headerShown: false }}>
    <ShopStack.Screen name="ShopHome"  component={ShopScreen} />
    <ShopStack.Screen name="Menu" component={Menu} />
    <ShopStack.Screen name="EditProduct" component={EditProduct} />
    <ShopStack.Screen name="Rating" component={Rating} />
    <ShopStack.Screen name="AddProduct" component={AddProduct} />
    <ShopStack.Screen name="DetailProductShopScreen" component={DetailProductShopScreen} />
    <ShopStack.Screen name="OrderList" component={OrderList} />
    <ShopStack.Screen name="OrderDetailShop" component={OrderDetailShop} />
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
    <UserStack.Screen name="ProductDetailUser" component={ProductDetailUser} />
    <UserStack.Screen name="ShopDetailUser" component={ShopDetailUser} />
    <UserStack.Screen name="foodList" component={foodList} />
    <UserStack.Screen name="Cart" component={Cart} />
    <UserStack.Screen name="Pay" component={Pay} />
    <UserStack.Screen name="DetailOrderUser" component={DetailOrderUser} />
    <UserStack.Screen name="Rating" component={Rating} />
    <UserStack.Screen name="Promotion" component={Promotion} />
    <UserStack.Screen name="News" component={News} />
    <UserStack.Screen name="AddRating" component={AddRating} />
  </UserStack.Navigator>
);

const AdminNavigator = () => (
  <AdminStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminStack.Screen name="Admin" component={AdminScreen} />
    <AdminStack.Screen name="EditShop" component={EditShopScreen} />
  </AdminStack.Navigator>
);

const AppNavigator = ({ isLoggedIn, role }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            {role === 'ADMIN' && (
              <Stack.Screen name="Admin" component={AdminNavigator} />
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
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;