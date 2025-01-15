


import React, { useContext, useEffect } from 'react';
import { NativeRouter } from 'react-router-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingScreen from "./loading";
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
    const { resetAuth, isLoggedIn, role } = useContext(AuthContext)

  // KHÔNG ĐƯỢC XÓA, NẾU ĐĂNG NHẬP LỖI => KHÔNG LOGOUT ĐƯỢC => MỞ LẠI CODE CHẠY LẠI CHƯƠNG TRÌNH ĐỂ LOGIN LẠI.
//   useEffect(() => {
//     resetAuth();
//   }, [resetAuth]);

 const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    // Mô phỏng thời gian load (ví dụ 2 giây)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Nếu đang load, hiển thị màn hình Loading
  if (isLoading) {
    return <LoadingScreen />;
  }



    console.log("isLoggedIn:", isLoggedIn, "role:", role);

    return (
        <NativeRouter>
            <AppNavigator isLoggedIn={isLoggedIn} role={role} />
        </NativeRouter>
    );
}
