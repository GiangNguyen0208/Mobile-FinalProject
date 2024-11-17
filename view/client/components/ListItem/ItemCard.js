import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, Modal} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AddToCartModal from "../Modal/AddToCardModal";


const ItemCard = ({ item, navigation ,isShopOwner}) => {
    const handlePress = () => {
        if (isShopOwner) {
            navigation.navigate('Edit', { item });
        } else {
            navigation.navigate('Detail', { item });
        }
    };
    const [modalVisible, setModalVisible] = useState(false);

    const addToCard = ({item}) => {
        setModalVisible(true);
    };

    return (
        <View style={[styles.card,styles.row]}>
            <TouchableOpacity style={{flex:5}} onPress={(event) => handlePress(event)}>
                <Image source={item.img} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.info}>
                <TouchableOpacity onPress={(event) => handlePress(event)}>
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
                <View style={[styles.priceContainer,styles.row]}>
                    <Text style={styles.price}>{item.price.toFixed(2)} đ</Text>
                    {!isShopOwner && (
                    <TouchableOpacity onPress={addToCard}>
                        <Entypo name="squared-plus" color="#E95322" style={[styles.title, styles.alignSelf]} />
                    </TouchableOpacity>
                    )}
                </View>
            </View>
            {!isShopOwner && (
            <AddToCartModal
                item={item}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        overflow: 'hidden',
        width: '100%', // Đặt chiều rộng cho card
        height: 120,
        margin: 10,
    },
    image: {
        resizeMode:'contain',
        width: '100%', // Chiếm hết chiều rộng của card
        height: '100%', // Đặt chiều cao cho hình ảnh
    },
    info: {
        padding: 5,
        justifyContent:"space-between",
        flex:7
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        top: 4,
        left:10
    },
    price: {
        fontSize: 16,
        color: '#666',
    },
    priceContainer: {
        marginHorizontal:10,
        bottom:4,
        justifyContent:"space-between",
    },
    row:{
        flexDirection:"row",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default ItemCard;
