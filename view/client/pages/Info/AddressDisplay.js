import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const AddressDisplay = ({ navigation }) => {
    // Địa chỉ mặc định (có thể lấy từ backend hoặc state)
    const [address, setAddress] = useState({
        addressLine: 'Số 123, Đường ABC',
        district: 'Quận 1',
        city: 'Hồ Chí Minh',
        zipcode: '700000',
    });

    // Hàm xử lý khi nhấn nút chỉnh sửa
    const handleEdit = () => {
        navigation.navigate('AddressForm', { address });  // Chuyển đến trang chỉnh sửa và truyền thông tin địa chỉ
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông Tin Địa Chỉ</Text>

            {/* Hiển thị địa chỉ */}
            <View style={styles.addressContainer}>
                <Text style={styles.addressText}>Địa chỉ: {address.addressLine}</Text>

                <Text style={styles.addressText}>Quận/Huyện: {address.district}</Text>
                <Text style={styles.addressText}>Thành phố/Tỉnh: {address.city}</Text>
                <Text style={styles.addressText}>Mã bưu điện: {address.zipcode}</Text>
            </View>

            {/* Nút chỉnh sửa */}
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.editButtonText}>Chỉnh sửa</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    addressContainer: {
        marginBottom: 20,

    },
    addressText: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 500,
        marginRight: 30
    },
    editButton: {
        padding: 10,
        backgroundColor: '#e74c3c',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        marginTop: 20,
        alignSelf: 'center',
    },
    editButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddressDisplay;
