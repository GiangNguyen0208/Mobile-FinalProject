import React, { useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import Item from './Item';
import { getNotificationsByShop } from "../../../../api/systemApi";
import { useFocusEffect } from '@react-navigation/native';

export default function Notifications({ navigation ,route}) {
    const { shop } = route.params;
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchNotifications = async () => {
        setLoading(true);
        try {
            // Giả sử getNotificationsByShop là hàm gọi API
            const response = await getNotificationsByShop(shop.id);
            setNotifications(response.result || []);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (shop?.id) {
                fetchNotifications();
            }
        }, [shop?.id])
    );


    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={({ item }) => (
                    <Item  title={item.title}  description={item.message} onPress={() => {
                        navigation.navigate("AddNotification", { shop: shop, notification: item });
                    }}></Item>
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={1}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("AddNotification",{ shop: shop, notification:null })}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },

    button: {
        width: 60, // Đường kính của nút
        height: 60,
        borderRadius: 30, // Đảm bảo nút tròn
        backgroundColor: '#E95322', // Màu nền nút
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', // Đặt vị trí tuyệt đối
        right: 16, // Cách cạnh phải 16px
        bottom: 16, // Cách cạnh dưới 16px
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5, // Hiệu ứng nổi (chỉ áp dụng cho Android)
      },
});

