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

export default function Rating({ navigation ,route}) {
    const { shopId } = route.params;
    const [comments, setComments] = useState([]);
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
        <SafeAreaView >
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


});

