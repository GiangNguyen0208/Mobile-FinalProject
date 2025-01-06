// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonMyOrderRefused = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,         // Đặt độ rộng của đường viền
        borderColor: '#FFA500', // Màu của đường viền
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'transparent', // Nền trong suốt
        width:230,
        height:70,
    },
    buttonText: {
        color: '#FFA500', // Màu chữ tương ứng với đường viền
        fontSize: 24,
        fontWeight: 'bold',
        top:5
    },
});

export default ButtonMyOrderRefused;
