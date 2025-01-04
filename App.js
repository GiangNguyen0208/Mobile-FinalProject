import React, { useContext, useEffect } from 'react';
import { NativeRouter } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
<<<<<<< HEAD
import AdminScreen from './view/client/admin/AdminScreen';
import EditProfile from './view/client/admin/EditProfile';
import Setting from './view/client/admin/Setting';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './view/client/pages/Info/index'; // Ensure Index is a valid component
=======
import { AuthProvider, AuthContext } from './view/context/Auth/AuthContext'; // Đảm bảo AuthProvider và AuthContext được import đúng
import AppNavigator from './routes';
>>>>>>> refs/remotes/origin/main

const Stack = createStackNavigator();

export default function App() {
<<<<<<< HEAD
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
=======
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
      <AppNavigator isLoggedIn={isLoggedIn} role={role} />
    </NativeRouter>
  );

>>>>>>> refs/remotes/origin/main
}

