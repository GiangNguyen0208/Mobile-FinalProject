import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // SafeAreaProvider đã được giữ lại
import AdminScreen from './view/admin/screen/AdminScreen';
import EditProfile from './view/admin/screen/EditProfile';
import Setting from './view/admin/screen/Setting';
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
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="Setting" component={Setting} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

