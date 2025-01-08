import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, Modal} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AddToCartModal from "../Modal/AddToCardModal";
import Rating from "../Rating/StartRender";

const ItemCard = ({type, item, navigation ,isShopOwner}) => {
    const handlePress = () => {
        if (isShopOwner) {
            console.log('edit')
            navigation.navigate('EditProduct', { item });
        } else {
            // navigation.navigate('Detail', { item });
            console.log('Detail')
        }
    };
    const [modalVisible, setModalVisible] = useState(false);

    const addToCard = ({item}) => {
        setModalVisible(true);
    };

    // Hàm định dạng ngày tháng năm
    const formatDateFromArray = (dateArray) => {
        const date = new Date(
            dateArray[0], // Year
            dateArray[1] - 1, // Month (0-indexed)
            dateArray[2], // Day
            dateArray[3], // Hours
            dateArray[4], // Minutes
            dateArray[5], // Seconds
            Math.floor(dateArray[6] / 1e6) // Milliseconds
        );
        return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
    };

    return (
        <TouchableOpacity style={[styles.card,type === 'product' && {flexDirection:"row",height:120}]}onPress={type === 'product' ? handlePress : null}>
            {(type==='product')&&(
                <TouchableOpacity style={{flex:5}} >
                    <Image source={item.img} style={styles.image} />
                </TouchableOpacity>
            )}
            <View style={styles.info}>
                <View style={type === 'comment' && styles.row}>
                    {type==='comment'&&(
                        <View style={{left:8,top:5}}>
                            <FontAwesome5 name="user-circle" size={24} color="black" />
                        </View>
                    )}
                    <TouchableOpacity >
                        <Text style={styles.name}>
                            {type === 'comment' ? item.userName : item.name }
                        </Text>
                    </TouchableOpacity>
                </View>
                {!(type==='voucher')&&(
                    <Rating rating={item.rating}/>
                )}
                <View style={[styles.priceContainer,type === 'product' && styles.row]}>
                    <Text style={styles.price}>{item.price}</Text>
                    {type==='voucher'&&(
                        <View style={[styles.voucherContainer, styles.border_bot]}>
                            <View style={{flexDirection:'row',marginVertical:16,}}>
                                <FontAwesome5 name="tag" size={16} color='#E95322' />
                                <Text style={styles.voucherTitle} numberOfLines={1} ellipsizeMode="tail">
                                    Nhập "{item.code}": {item.description}
                                </Text>
                            </View>
                            <Text style={styles.voucherText}>Đặt tối thiểu: {item.minimumOrderValue}đ</Text>
                            <Text style={styles.voucherText}>Số lượng có hạn</Text>
                        </View>
                    )}
                    {!isShopOwner && (
                        <TouchableOpacity onPress={addToCard}>
                            <Entypo name="squared-plus" color="#E95322" style={[styles.title, styles.alignSelf]} />
                        </TouchableOpacity>
                    )}
                </View>
                {(type==='comment')&&(
                    <View style={{left: 12}}>
                        <Text style={styles.content}>{item.message}</Text>
                    </View>
                )}
            </View>
            {(type==='comment')&&(
                <TouchableOpacity  >
                    <Image source={{ uri:"https://via.placeholder.com/150"}} style={styles.cmtImg} />
                    <Text style={styles.date}>{formatDateFromArray(item.createdAt)}</Text>
                </TouchableOpacity>
            )}
            {!isShopOwner && (
                <AddToCartModal
                    item={item}
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    date: {
        fontSize: 14,
        color: "#555",
        left:16,
        bottom: 8,
    },

    card: {
        overflow: 'hidden',
        width: '100%', // Đặt chiều rộng cho card
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
        left:16
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
    //style của comment
    cmtImg:{
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin:10,
    },
    content:{
        top:-8, 
        flexWrap: 'wrap',
    },

    // style cua voucher
    voucherText:{
        flexWrap: 'wrap',
        lineHeight:24,
    },
    voucherContainer:{
        height: 240,
    },
    voucherTitle:{
        fontSize:16,
        lineHeight:18,
        left:8,
    },
});

export default ItemCard;
