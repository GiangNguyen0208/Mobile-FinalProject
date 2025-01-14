import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Rating from '../Rating/StartRender';


const Item = ({ image, title, description, price, rating, onPress }) => {
    const imageSource = image ? { uri: image } : null; // Dùng base64Image nếu có


    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
        >
            {/* Chỉ hiển thị hình ảnh nếu có `imageSource` */}
            {imageSource ? (
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
            ) : null}

            {/* Kiểm tra từng phần dữ liệu */}
            {(title || description || price || rating) && (
                <View style={styles.textContainer}>
                    {title && <Text style={styles.title}>{title}</Text>}
                    {description && <Text style={styles.description}>{description}</Text>}
                    {price && <Text style={styles.date}>{price}</Text>}
                    {rating && <Rating rating={rating} />}
                </View>
            )}
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 2, // Adjusted for better spacing
        backgroundColor: 'white',

    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black', // Ensure this is visible against the background
    },
    description: {
        fontSize: 14,
        color: 'black', // Changed to black for visibility
    },
    date: {
        fontSize: 12,
        color: 'black', // Changed to black for visibility
    },
});

export default Item;
