import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addNotification, editNotification,deleteNotification } from '../../../api/shopApi';


export default function AddNotifications({ route, navigation }) {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const { shop, notification } = route.params; // Lấy shop và notification từ params

    const isEditMode = notification != null; // Kiểm tra nếu có notification thì là chế độ chỉnh sửa

    useEffect(() => {
        if (isEditMode) {
            // Điền dữ liệu của notification vào các trường nếu là chế độ chỉnh sửa
            setTitle(notification.title);
            setMessage(notification.message);
        }
    }, [isEditMode, notification]);

    const handleDelete = async (notificationId) => {
        try {
            const response = await deleteNotification(notificationId);
            if ( response.status === 200) {
                alert('Xóa thông báo thành công!');
                navigation.goBack();
            } else {
                alert('Xóa thông báo thất bại!');
            }
        } catch (error) {
            console.error("Lỗi khi xóa thông báo:", error);
            alert('Đã xảy ra lỗi khi xóa thông báo.');
        }
    };
    

    const handleSubmit = async () => {
        const notificationData = {
            title: title,
            message: message,
            shopId: shop.id, // Dùng shop.id từ shop
        };

        let response;
        if (isEditMode) {
            // Sửa thông báo
            response = await editNotification(notification.id, notificationData);
        } else {
            // Thêm thông báo mới
            response = await addNotification(notificationData);
        }

        if (response.code === 1000) {
            alert(isEditMode ? 'Cập nhật thông báo thành công!' : 'Thêm thông báo thành công!');
            setTitle('');
            setMessage('');
            navigation.goBack(); // Quay lại màn hình trước
        } else {
            alert(isEditMode ? 'Cập nhật thông báo thất bại!' : 'Thêm thông báo thất bại!');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Tiêu đề"
                value={title}
                onChangeText={setTitle}
                editable={!isEditMode}  // Nếu là chế độ chỉnh sửa, không cho phép chỉnh sửa
            />

            <TextInput
                style={styles.input}
                placeholder="Nội dung"
                value={message}
                onChangeText={setMessage}
            />
            {/* Hiển thị tên cửa hàng nếu có */}
            {shop && shop.name ? (
                <Text style={styles.input}>{shop.name}</Text>
            ) : (
                <Text>Cửa hàng không có tên</Text> // Hiển thị khi không có tên cửa hàng
            )}
            <Button
                title={isEditMode ? "Cập nhật thông báo" : "Thêm thông báo"}
                onPress={handleSubmit}
                color={"#E95322"}
            />
            {isEditMode&&(
                <View style={{ marginTop: 8 }}>
                    <Button
                        title={"Xóa thông báo"}
                        onPress={() => handleDelete(notification.id)}
                        color={"#E95322"}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
});
