import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ListHorizontal from "./ListHorizontal";
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from './ItemCard';
import { getListCommentByShopId } from "../../../../api/shopApi";
import { useAuth } from '../../../context/Auth/AuthContext';

export default function Rating({ navigation }) {
    const [comments, setComments] = useState([]);
    const [ shopId ] = useAuth();
    useEffect(() => {
        const fetchComments = async () => {
            try {
                // Gọi API lấy dữ liệu theo shop id
                const commentsData = await getListCommentByShopId(shopId);
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchComments(); // Gọi hàm fetchProductsAndCategories
    }, [shopId]);

    useEffect(() => {
        console.log("Fetched data:", comments); // Log dữ liệu của products
    }, [comments]);


    


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={comments}
                renderItem={({ item }) => (
                    <ItemCard type={'comment'} item={item} navigation={navigation} isShopOwner={true}></ItemCard>
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={1}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    voucherText: {
        flexWrap: 'wrap',
        lineHeight: 24,
    },
    container: {
        backgroundColor: 'white',
    },
    voucherContainer: {
        height: 260,
        marginHorizontal: 16,
    },
    userName: {
        fontSize: 16,
        lineHeight: 24,
        left: 8,
    },
    border_bot: {
        borderBottomWidth: 0.3,
        borderBottomColor: '#f0f0f0 ',
        width: '95%',
        alignSelf: "center",
    },
    ratingStar: {

    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginVertical: 16,
    },
    avatarContainer: {
        width: 50, // Chiều rộng của avatar
        height: 50, // Chiều cao của avatar
        borderRadius: 25, // Viền tròn cho avatar
        overflow: 'hidden', // Ẩn các phần bên ngoài viền tròn
        marginRight: 10, // Khoảng cách bên phải của avatar
    },
    avatar: {
        width: '100%', // Đảm bảo ảnh phủ đầy container
        height: '100%', // Đảm bảo ảnh phủ đầy container
    },
});

