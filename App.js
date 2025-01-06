<<<<<<< HEAD
import React, { useContext, useEffect } from 'react';
import { NativeRouter } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, AuthContext } from './view/context/Auth/AuthContext'; // Đảm bảo AuthProvider và AuthContext được import đúng
import AppNavigator from './routes';
=======
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // SafeAreaProvider đã được giữ lại
import AdminScreen from './view/admin/screen/AdminScreen';
import EditProfile from './view/admin/screen/EditProfile';
import Setting from './view/admin/screen/Setting';
import { NavigationContainer } from '@react-navigation/native'; // NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // createStackNavigator
>>>>>>> 39371adf3c885748a1b5e789740c10551d21aeb5

// Khai báo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
<<<<<<< HEAD
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

function MainApp() {
  const { resetAuth, isLoggedIn, role } = useContext(AuthContext);

  // KHÔNG ĐƯỢC XÓA, NẾU ĐĂNG NHẬP LỖI => KHÔNG LOGOUT ĐƯỢC => MỞ LẠI CODE CHẠY LẠI CHƯƠNG TRÌNH ĐỂ LOGIN LẠI.
  // useEffect(() => {
  //   resetAuth();
  // }, [resetAuth]);

  console.log("isLoggedIn:", isLoggedIn, "role:", role);

  return (
    <NativeRouter>
      {/* <AppNavigator isLoggedIn={isLoggedIn} role={role} /> */}
      <AppNavigator isLoggedIn={true} role={'ADMIN'}/>
    </NativeRouter>
  );

}

=======
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
>>>>>>> 39371adf3c885748a1b5e789740c10551d21aeb5
