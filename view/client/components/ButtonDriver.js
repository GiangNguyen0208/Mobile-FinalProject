// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonMyOrderRefused = ({ text, onPress, borderColor = '#FFA500', textColor = '#FFA500' }) => {
    return (
        <TouchableOpacity style={[styles.button, { borderColor }]} onPress={onPress}>
            <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,         // Đặt độ rộng của đường viền
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'transparent', // Nền trong suốt
        width: 100,
        height: 40,
    },
    buttonText: {
        fontSize: 10,
        fontWeight: 600
    },
});

export default ButtonMyOrderRefused;
