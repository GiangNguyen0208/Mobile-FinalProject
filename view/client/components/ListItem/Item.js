import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Item = ({ image, title, description, date, onPress }) => {
    // Ensure image is a valid string URL or a local image
    const imageSource = typeof image === 'string' ? { uri: image } : image;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Image source={imageSource} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10, // Adjusted for better spacing
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
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