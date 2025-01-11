import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Item from './Item';
import ItemCard from "./ItemCard";

const List = ({ items }) => {
    const isShopOwner = true;
    return (
        <View style={[styles.border_bot, styles.container,]}>
            {items.length > 0 ? (
                items.map((item) => (
                    <ItemCard item={item} isShopOwner={isShopOwner}/>
                ))
            ) : (
                <Text>No announcements.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    border_bot:{
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        marginBottom:12,
        width:'95%',
        alignSelf:"center"
    }
});

export default List;
