import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import User from './view/client/pages/Info/User';
import AdminScreen from './view/client/admin/AdminScreen';
import EditAdminProfile from './view/client/admin/EditProfile';
import Setting from './view/client/admin/Setting';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfile from './view/client/admin/EditProfile';


const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AdminProfile">
                <Stack.Screen name="AdminProfile" component={AdminScreen} />
                <Stack.Screen name="EditProfile" component={EditAdminProfile} />
                <Stack.Screen name="Setting" component={Setting} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
