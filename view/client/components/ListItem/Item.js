import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Rating from '../Rating/StartRender';


const Item = ({ image, title, description, price, rating, onPress, onAddToCart }) => {
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

        alignItems: 'flex-start',
        padding: 12,
        borderBottomWidth: 1,

        borderBottomColor: '#ccc',
        marginBottom: 2, // Adjusted for better spacing
        backgroundColor: 'white',
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 10,
        marginRight: 15,
        backgroundColor: '#e0e0e0',
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        color: '#007BFF',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        maxWidth: 130
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
});


export default Item;
