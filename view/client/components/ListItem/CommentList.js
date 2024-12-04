import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, FlatList} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function VoucherList({navigation}) {
    const comments = [
        {
            id: 1,
            user: {
                name: "Nguyễn Văn A",
                avatar: "https://example.com/avatar1.png",
            },
            content: "Sản phẩm tuyệt vời! Tôi rất hài lòng.",
            rating: 5,
            timestamp: "2024-04-20 09:00", // Định dạng ngày giờ "YYYY-MM-DD HH:mm"
        },
        {
            id: 2,
            user: {
                name: "Trần Thị B",
                avatar: "https://example.com/avatar2.png",
            },
            content: "Dịch vụ khách hàng rất tốt!",
            rating: 4,
            timestamp: "2024-04-19 14:00", // Định dạng ngày giờ "YYYY-MM-DD HH:mm"
        },
        {
            id: 3,
            user: {
                name: "Lê Văn C",
                avatar: "https://example.com/avatar3.png",
            },
            content: "Mình đã sử dụng sản phẩm này và thấy rất ổn!",
            rating: 4,
            timestamp: "2024-04-18 11:30", // Định dạng ngày giờ "YYYY-MM-DD HH:mm"
        },
        {
            id: 4,
            user: {
                name: "Phạm Thị D",
                avatar: "https://example.com/avatar4.png",
            },
            content: "Sản phẩm không như mong đợi.",
            rating: 2,
            timestamp: "2024-04-17 16:45", // Định dạng ngày giờ "YYYY-MM-DD HH:mm"
        },
        {
            id: 5,
            user: {
                name: "Trương Văn E",
                avatar: "https://example.com/avatar5.png",
            },
            content: "Chất lượng tốt, giá cả hợp lý.",
            rating: 5,
            timestamp: "2024-04-16 08:15", // Định dạng ngày giờ "YYYY-MM-DD HH:mm"
        },
    ];

    const StarRender = ({ rating }) => {
        const stars = [];
        const starRender = (rating) => {
            const fullStars = Math.floor(rating); // Số sao đầy đủ
            const halfStar = rating % 1 !== 0 ? 1 : 0; // Số nửa sao
            for (let i = 0; i < fullStars; i++) {
                stars.push(
                    <FontAwesome key={`star-${i}`} name="star" size={20} color="#FFD12F" />
                );
            }
            if(halfStar){
                for (let i = 0; i < halfStar; i++) {
                    stars.push(
                        <FontAwesome key={`star-half-full-${i}`} name="star-half-full" size={20} color="#FFD12F" />
                    );}
            }
            const remainingStars = 5 - fullStars - halfStar; // Tính số sao rỗng
            for (let i = 0; i < remainingStars; i++) {
                stars.push(
                    <FontAwesome key={`star-o-${i}`} name="star-o" size={20} color="#FFD12F" />
                );
            }
        };
        starRender(rating);
        return (
            <View style={[styles.row,styles.ratingStar]}>
                <Text >{stars}</Text>
            </View>
        );
    };
    
    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                renderItem={({ item, index }) => (
                    <View style={[styles.voucherContainer, styles.border_bot]}>
                        <View style={{flexDirection:'row',marginVertical:16,}}>
                            <FontAwesome5 name="user-circle" size={24} color="black" />
                            <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                                {item.user.name}
                            </Text>
                        </View>
                        <StarRender rating={item.rating}></StarRender>
                        <Text style={styles.voucherText}>{item.content}</Text>
                        <Image source={{ uri:'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'}} style={styles.img}></Image>
                        <Text style={styles.voucherText}>{item.timestamp}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                numColumns={1}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    voucherText:{
        flexWrap: 'wrap',
        lineHeight:24,
    },
    container:{
        backgroundColor:'white',
    },
    voucherContainer:{
        height: 260,
        marginHorizontal:16,
    },
    userName:{
        fontSize:16,
        lineHeight: 24,
        left:8,
    },
    border_bot:{
        borderBottomWidth: 0.3,
        borderBottomColor: '#f0f0f0 ',
        width:'95%',
        alignSelf:"center",
    },
    ratingStar:{

    },
    img:{
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginVertical:16,
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

