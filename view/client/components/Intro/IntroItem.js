import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const IntroItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.container}onPress={() => onPress(item)}>
            <Image 
                source={item.image}
                style={styles.image}
                resizeMode="cover"
            />
            <Text style={styles.title}>{item.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        backgroundColor: 'white', // Light gray background, adjust as needed
        width: 160, // Adjust width as needed
        elevation: 3,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: 'black',
    },
});

export default IntroItem;