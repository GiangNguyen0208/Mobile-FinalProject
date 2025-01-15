import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { addComment } from '../../../../api/userApi';
import { useAuth } from '../../../context/Auth/AuthContext';

export default function AddRating({ navigation, route }) {
    const { shopId, productId, onAddComment  } = route.params; // Nhận dữ liệu từ route nếu cần
    const [message, setComment] = useState('');
    const [rating, setRating] = useState('');
    const { userId } = useAuth();

    const handleSubmit = async () => {
        if (!message || !rating) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        try {
            const userData = {
                message,
                rating: parseFloat(rating, 10),
                shopId,
                productId,
                userId
            };
            const response = await addComment(userData);

            if (onAddComment) {
                onAddComment(response);
            }

            Alert.alert('Thành công', 'Đánh giá của bạn đã được gửi!');
            navigation.goBack();
        } catch (error) {
            console.error('Error submitting comment:', error);
            Alert.alert('Lỗi', 'Không thể gửi đánh giá. Vui lòng thử lại!');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Thêm đánh giá</Text>
            <TextInput
                style={styles.input}
                placeholder="Nhập đánh giá của bạn"
                multiline
                value={message}
                onChangeText={setComment}
            />
            <TextInput
                style={styles.input}
                placeholder="Nhập điểm đánh giá (1-5)"
                keyboardType="numeric"
                value={rating}
                onChangeText={setRating}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Gửi đánh giá</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#E95322',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
