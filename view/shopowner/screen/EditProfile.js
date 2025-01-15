import React, { useState, useEffect,useContext } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { shopProfile } from '../../../api/shopApi';
import { getShopById } from '../../../api/adminApi';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext, useAuth } from "../../context/Auth/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfile({ navigation, route }) {
    const { shopId } = route.params;
    const { logout } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState('');
    const [shop, setShop] = useState({});

    useFocusEffect(
        React.useCallback(() => {
            const fetchShop = async () => {
                try {
                    const shopData = await getShopById(shopId);
                    setShop(shopData);
                    setName(shopData.name);
                    setAddress(shopData.address);
                    setImage(shopData.image);
                } catch (error) {
                    console.error("Error fetching shop data:", error);
                }
            };
            fetchShop();
        }, [shopId])
    );


    // Hàm xử lý khi nhấn nút "Save"
    const handleSave = async () => {
        const updatedShop = {
            ...shop, // Giữ nguyên các trường khác
            name,    // Lấy từ state `name`
            address, // Lấy từ state `address`
            image,   // Lấy từ state `image`
        };
        const response = await shopProfile(shop.id, updatedShop);
        if (response.status === 200) {
            alert('Cập nhật thành công!');
            setName('');
            setAddress('');
            setImage('');
            navigation.goBack(); // Quay lại màn hình trước
        } else {
            alert('Cập nhật  thất bại!');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            await AsyncStorage.removeItem("token");
            Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công!');
        } catch (error) {
            console.error("Logout Failed!", error);
            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
        }
    };


    // Kiểm tra URL hợp lệ
    const isValidUrl = (url) => {
        return /^(http:\/\/|https:\/\/)/.test(url); // Kiểm tra URL bắt đầu bằng http:// hoặc https://
    };



    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.label}>Tên quán</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập tên quán"
                value={name}
                onChangeText={setName}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Text style={styles.label}>Địa chỉ quán</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ quán"
                value={address}
                onChangeText={setAddress}
            />
            {errors.address && <Text style={styles.error}>{errors.address}</Text>}

            <Text style={styles.label}>Hình ảnh quán</Text>
            <TextInput
                style={styles.input}
                placeholder="URL hình ảnh"
                value={image}
                onChangeText={setImage}
                keyboardType="url"
            />

            {/* Kiểm tra URL hợp lệ và hiển thị hình ảnh nếu URL hợp lệ */}
            {isValidUrl(image) ? (
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
            ) : (
                <Text style={styles.error}>URL không hợp lệ. Vui lòng nhập URL hợp lệ bắt đầu với http:// hoặc https://</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Lưu thông tin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    error: {
        fontSize: 14,
        color: 'red',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#E95322',  // Màu cam
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginTop: 20,
        alignSelf: 'center',
    },
});
