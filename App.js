import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // SafeAreaProvider đã được giữ lại
import AdminScreen from './view/client/pages/Info/AddressForm';

import { NavigationContainer } from '@react-navigation/native'; // NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // createStackNavigator


// Khai báo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            {/* Đảm bảo NavigationContainer bao bọc toàn bộ ứng dụng */}
            <NavigationContainer>
                <Stack.Navigator initialRouteName="AdminScreen">
                    {/* Các màn hình đã được khai báo đúng tên và component */}
                    <Stack.Screen name="AdminScreen" component={AdminScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
