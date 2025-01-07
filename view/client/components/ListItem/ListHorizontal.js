import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import Item from './Item'; // Import the Item component

const ListHorizontal = ({ items, onItemPress }) => {
    const renderItem = ({ item }) => (
        <Item
            image={item.base64Image}
            title={item.title}
            description={item.description}
            date={item.date}
            onPress={() => onItemPress(item)} // Pass the onPress function
        />
    );

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<Text>No items available</Text>} // Handle empty state
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
    },
});

export default ListHorizontal;
