import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AdminScreen from './view/client/admin/AdminScreen';
import EditProfile from './view/client/admin/EditProfile';
import Setting from './view/client/admin/Setting';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './view/client/pages/Info/index'; // Ensure Index is a valid component

const Stack = createStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="AdminScreen">
                    {/* Đảm bảo các màn hình đã được khai báo đúng tên */}
                    <Stack.Screen name="AdminScreen" component={AdminScreen} />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="Setting" component={Setting} />

                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

