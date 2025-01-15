import React from 'react';
import { View, StyleSheet, Text,FlatList } from 'react-native';
import ItemCard from "./ItemCard";

const List = ({ items,navigation ,type}) => {
    
    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ItemCard type={type} item={item} navigation={navigation} isShopOwner={false}></ItemCard>
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={1}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       
       
    },
});

export default List;
