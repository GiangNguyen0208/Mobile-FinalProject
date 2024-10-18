import { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PrivateRouter({ children }) {
    const isLogin = false;
    const navigation = useNavigation();

    useEffect(() => {
        if (!isLogin) {
            navigation.navigate("login"); 
        }
    }, [isLogin, navigation]);

    if (!isLogin) {
        return null;
    }

    return <View>{children}</View>; // Render children if logged in
}
