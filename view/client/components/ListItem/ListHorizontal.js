import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ItemCard from './ItemCard'; // Import the Item component

// <<<<<<< HEAD
// const ListHorizontal = ({navigation, items ,type}) => {
// =======
const ListHorizontal = ({ items, onItemPress }) => {

    const renderItem = ({ item }) => (
        <Item
            image={item.base64Image}
            title={item.title}
            description={item.description}
            date={item.date}
            rating={item.rating}
            onPress={() => onItemPress(item)} // Pass the onPress function
        />
    );

    return (

        // <View style={styles.container}>
        //     <FlatList
        //         data={items}
        //         renderItem={({ item }) => (
        //             <View style={styles.card}>
        //                 <ItemCard type={type} item={item} navigation={navigation} isShopOwner={false} />
        //             </View>
        //         )}
        //         keyExtractor={(_, index) => index.toString()}
        //         horizontal={true}  // Thiết lập chiều ngang
        //         showsHorizontalScrollIndicator={false}  // Ẩn thanh cuộn ngang
        //         contentContainerStyle={styles.flatList}  // Tùy chỉnh style của FlatList
        //     />
        // </View>

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
        height:110,
        margin: 8,
        justifyContent:'center'
    },
});


export default ListHorizontal;
