import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import StarRender from "../../components/Rating/StartRender"


// const Item = ({ image, title, description, date, rating,onPress }) => {
//     // Ensure image is a valid string URL or a local image
//     const imageSource = typeof image === 'string' ? { uri: image } : image;

const Item = ({ image, title, description, date, onPress }) => {
    const imageSource = image ? { uri: image } : null; // Dùng base64Image nếu có


    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            {imageSource ? (
                <Image source={imageSource} style={styles.image} />
            ) : (
                <Text>No Image Available</Text> // Trường hợp không có hình ảnh
            )}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <StarRender rating={rating}></StarRender>
                <Text style={styles.date}>{date}</Text>
            </View>
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
        backgroundColor:'white',
       
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal:16
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
