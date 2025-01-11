


import React, { useContext, useEffect } from 'react';
import { NativeRouter } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider, AuthContext } from './view/context/Auth/AuthContext'; // Đảm bảo AuthProvider và AuthContext được import đúng
import AppNavigator from './routes';

export default function App() {
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
//   useEffect(() => {
//     resetAuth();
//   }, [resetAuth]);

  console.log("isLoggedIn:", isLoggedIn, "role:", role);

  return (
    <NativeRouter>
      <AppNavigator isLoggedIn={isLoggedIn} role={role} />
    </NativeRouter>
  );
}


