import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Alert, FlatList } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ListHorizontal from "./ListHorizontal";
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from './ItemCard';
import { getListCommentByShop ,getListCommentByProduct} from "../../../../api/systemApi";
import { useAuth } from '../../../context/Auth/AuthContext';

export default function Rating({ navigation, route }) {
    const { productId } = route.params; // Lấy cả shopId và productId từ route.params
    const [comments, setComments] = useState([]);
    console.log("ShopId: " + shopId + ", ProductId: " + productId);
    const shopId = 4;
    useEffect(() => {
        const fetchComments = async () => {
            try {
                // Kiểm tra nếu có productId thì ưu tiên, nếu không dùng shopId
                const id = productId || shopId;
                if (!id) {
                    console.warn("Both productId and shopId are null. Unable to fetch comments.");
                    return;
                }
                const commentsData = productId
                    ? await getListCommentByProduct(productId)
                    : await getListCommentByShop(shopId);
                setComments(commentsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchComments(); // Gọi hàm fetchComments
    }, [shopId, productId]); // Theo dõi sự thay đổi của cả shopId và productId

    useEffect(() => {
        console.log("Fetched data:", comments); // Log dữ liệu của comments
    }, [comments]);

    const handleAddComment = (newComment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    return (
        <SafeAreaView >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đánh giá sản phẩm</Text>
                <Text style={styles.headerTitle}></Text>
                {/* Bạn có thể thêm các nút hoặc icon khác vào header nếu cần */}
            </View>
            <FlatList
                data={comments}
                renderItem={({ item }) => (
                    <ItemCard type={'comment'} item={item} navigation={navigation} isShopOwner={true}></ItemCard>
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={1}
            />
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate("AddRating", 
                { 
                    shopId: shopId,
                    productId: productId,
                    onAddComment: handleAddComment,
                })}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      },
      button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E95322',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 16,
        bottom: 150, // Thêm khoảng cách từ cạnh dưới
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
      },

});

