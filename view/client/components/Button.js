import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity
            style={{ ...styles.button, ...props.style }} // Gộp style nếu cần
            onPress={props.onPress} // Xử lý sự kiện nhấn
        >
            <Image
                source={require("../../../assets/Group 3.png")} // Đường dẫn đến hình ảnh của bạn
                style={styles.image} // Áp dụng style cho ảnh
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        // Nếu cần thêm style cho nút thì thêm vào đây, ví dụ như margin hay bo tròn góc
    },
    image: {
        width: 80, // Điều chỉnh kích thước ảnh theo mong muốn
        height: 80,
        resizeMode: 'contain', // Điều chỉnh cách hình ảnh được hiển thị (cover, contain,...)
    }
});

export default Button;
