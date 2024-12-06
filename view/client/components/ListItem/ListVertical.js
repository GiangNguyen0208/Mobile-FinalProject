import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import Item from './Item';

const ListVertical = ({ items }) => {
    const renderItem = ({ item }) => (
        <Item
            image={item.image}
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
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<Text>No items available</Text>} // Handle empty state
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default ListVertical;
