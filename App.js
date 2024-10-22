import React from 'react';
// import { Image } from 'react-native';
// import { Banner } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SubScreen from './view/client/pages/subScreen';
import Default from './view/client/layout/default';
import ProductDetail from "./view/client/pages/ProductDetail";
import ShopDetail from "./view/client/pages/ShopDetail";
import VoucherList from "./view/client/pages/VoucherList";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import SearchBox from "./view/client/components/search";

// Create a Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Default" component={Default} />
          <Stack.Screen name="Sub" component={SubScreen} />
          <Stack.Screen name="Detail" component={ProductDetail} options={{ headerShown: false }} />
          <Stack.Screen name="Shop" component={ShopDetail} options={{headerShown:false}} />
          <Stack.Screen name="Voucher" component={VoucherList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    searchBox:{
        width:'75%',
        marginHorizontal:16,
        backgroundColor:'#f2f3f5',
        paddingVertical: 4,
        paddingHorizontal: 16,
    }
})
export default App;
