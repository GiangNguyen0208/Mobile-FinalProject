import React from 'react';
// import { Image } from 'react-native';
// import { Banner } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Default from './view/client/layout/default';
import DonHang from './view/client/layout/DonHang';
import ChiTietDonHang from './view/client/layout/ChiTietDonHang';
import User from './view/client/layout/User';
// Create a Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name ="DonHang" component={DonHang}/>
             <Stack.Screen name ="User" component={User}/>
          <Stack.Screen name ="ChiTietDonHang" component={ChiTietDonHang}/>
        <Stack.Screen name="Default" component={Default} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;