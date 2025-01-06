// Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonRemove = ({
                                  text,
                                  onPress,
                                  borderColor = '#FFA500', // Màu viền mặc định
                                  textColor = '#FFA500',   // Màu chữ mặc định
                                  width = 230,             // Chiều rộng mặc định
                                  height = 70,             // Chiều cao mặc định
                                  fontSize = 24,           // Kích thước chữ mặc định
                                  borderWidth = 2,         // Độ rộng viền mặc định
                              }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    borderColor,       // Màu viền
                    width,             // Chiều rộng của button
                    height,            // Chiều cao của button
                    borderWidth,      // Độ rộng của viền
                }
            ]}
            onPress={onPress}
        >
            <Text
                style={[
                    styles.buttonText,
                    { color: textColor, fontSize }, // Màu chữ và kích thước chữ
                ]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'transparent', // Nền trong suốt
    },
    buttonText: {
        fontWeight: 'bold',
        top: 5
    },
});

export default ButtonRemove;
