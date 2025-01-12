import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Rating from '../Rating/StartRender';

const Item = ({ image, title, description, price, rating, onPress, onAddToCart }) => {
    const imageSource = image ? { uri: image } : null; // Dùng base64Image nếu có

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.itemContent}>
                {imageSource ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                ) : (
                    <Text>No Image Available</Text>
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                    <Text style={styles.price}>{price}</Text>
                    <Rating rating={rating} />
                    <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
                        <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: '#fefefe',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
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
        justifyContent: 'space-between',
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
