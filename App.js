import React from 'react';
// import { Image } from 'react-native';
// import { Banner } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SubScreen from './view/client/pages/subScreen';
import Default from './view/client/layout/default';

// Create a Stack Navigator
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Default" component={Default} />
        <Stack.Screen name="Sub" component={SubScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;