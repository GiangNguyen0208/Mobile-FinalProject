import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ItemCard from './ItemCard'; // Import the ItemCard component

const ListHorizontal = ({ items, onItemPress }) => {

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ItemCard type={type} item={item} navigation={navigation} isShopOwner={false}></ItemCard>
                )}
                keyExtractor={(item) => item.id.toString()} // Ensure id is a string
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={<Text>No items available</Text>} // Handle empty state
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 10, // Khoảng cách dưới của danh sách
    },
    flatList: {
        paddingHorizontal: 8, // Khoảng cách trái phải cho FlatList
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        width: 300,
        height: 110,
        margin: 8,
        justifyContent: 'center'
    },
    listContainer: {
        paddingHorizontal: 8, // Khoảng cách trái phải cho FlatList
    },
});

export default ListHorizontal;
