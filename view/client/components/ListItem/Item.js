import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Rating from '../Rating/StartRender';

const Item = ({ image, title, description, price, rating, onPress, onAddToCart }) => {
    const imageSource = image ? { uri: image } : null;

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={onPress} style={styles.itemContent}>
                {imageSource ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                    <Text style={styles.price}>${price}</Text>
                    <Rating rating={rating} />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
                            <Text style={styles.addButtonText}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.detailButton} onPress={onPress}>
                            <Text style={styles.detailButtonText}>Xem chi tiết</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 8,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Tạo hiệu ứng bóng cho Android
    },
    itemContent: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12,
    },
    placeholderContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#bbb',
        fontSize: 14,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF6F61',
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    addButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        flex: 1,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    detailButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Item;
