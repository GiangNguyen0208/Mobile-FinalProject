import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import Entypo from '@expo/vector-icons/Entypo';
import indexSt from "../../../../public/client/stylesheet/index.style";
import ItemCard from "./ItemCard";
const DATA = [
    { id: '1', name: 'Món ăn 1', price: 29.99, img: require('../../../../assets/img/order-food.png') },
    { id: '2', name: 'Món ăn 2', price: 19.99, img: require('../../../../assets/img/order-food.png') },
    { id: '3', name: 'Món ăn 3', price: 39.99, img: require('../../../../assets/img/order-food.png') },
    { id: '4', name: 'Món ăn 4', price: 15.99, img: require('../../../../assets/img/order-food.png') },
    { id: '5', name: 'Món ăn 5', price: 25.99, img: require('../../../../assets/img/order-food.png') },
];

const HorizontalFlatList = ({navigation}) => {
    const goDetail=()=>{

    }
    return (
        <FlatList
            data={DATA}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <ItemCard item={item} navigation={navigation} />
                </View>
            )}
            keyExtractor={item => item.id}
            horizontal={true} // Đặt chiều nằm ngang
            showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
        />
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        width: 300,
        height:110,
        margin: 10,
        justifyContent:'center'
    },

});

export default HorizontalFlatList;
