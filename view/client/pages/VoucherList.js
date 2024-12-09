import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, FlatList} from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import indexSt from '../../../public/client/stylesheet/index.style.js';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProductList({navigation}) {
    const voucherData = [
        {
            id:1,
            code: "FREESHIP50",
            description: "Miễn phí vận chuyển cho đơn hàng từ 50k.",
            minimumOrderValue: 50000, // Giá trị đặt hàng tối thiểu
            orderStartTime: "2024-10-01 09:00", // Thời gian bắt đầu áp dụng đặt hàng
            orderEndTime: "2024-12-31 23:59",   // Thời gian kết thúc áp dụng đặt hàng
            deliveryStartTime: "2024-10-01 09:00", // Thời gian bắt đầu áp dụng giao hàng
            deliveryEndTime: "2024-12-31 23:59",   // Thời gian kết thúc áp dụng giao hàng
            applicableFor: ["Tất cả sản phẩm"],  // Áp dụng cho những đối tượng
            notApplicableFor: ["Đồ điện tử", "Hàng cồng kềnh"], // Không áp dụng cho những đối tượng
            expirationDate: "2024-12-31 23:59",  // Hạn sử dụng voucher
            note: "Voucher không áp dụng cùng với các mã giảm giá khác.",
        },
        {
            id:2,
            code: "DISCOUNT20",
            description: "Giảm 20% cho đơn hàng từ 100k.",
            minimumOrderValue: 100000,
            orderStartTime: "2024-10-10 08:00",
            orderEndTime: "2024-12-31 22:00",
            deliveryStartTime: "2024-10-10 08:00",
            deliveryEndTime: "2024-12-31 22:00",
            applicableFor: ["Quần áo", "Giày dép"],
            notApplicableFor: ["Phụ kiện công nghệ"],
            expirationDate: "2024-12-31 22:00",
            note: "Voucher không áp dụng với sản phẩm đang giảm giá.",
        },
        {
            id:3,
            code: "BUY1GET1",
            description: "Mua 1 tặng 1 cho tất cả các mặt hàng thời trang.",
            minimumOrderValue: 50000,
            orderStartTime: "2024-11-01 00:00",
            orderEndTime: "2024-11-30 23:59",
            deliveryStartTime: "2024-11-01 00:00",
            deliveryEndTime: "2024-11-30 23:59",
            applicableFor: ["Thời trang nam", "Thời trang nữ"],
            notApplicableFor: ["Hàng phụ kiện", "Giày dép"],
            expirationDate: "2024-11-30 23:59",
            note: "Voucher chỉ áp dụng cho sản phẩm không giảm giá.",
        },
        {
            id:4,
            code: "SUMMER10",
            description: "Giảm 10% cho tất cả đơn hàng trên 200k.",
            minimumOrderValue: 200000,
            orderStartTime: "2024-06-01 09:00",
            orderEndTime: "2024-09-30 23:59",
            deliveryStartTime: "2024-06-01 09:00",
            deliveryEndTime: "2024-09-30 23:59",
            applicableFor: ["Đồ gia dụng", "Thực phẩm"],
            notApplicableFor: ["Hàng công nghệ", "Thiết bị điện tử"],
            expirationDate: "2024-09-30 23:59",
            note: "Áp dụng khi thanh toán qua ví điện tử.",
        },
        {
            id:5,
            code: "FRESHFOOD15",
            description: "Giảm 15% cho đơn hàng thực phẩm tươi sống từ 150k.",
            minimumOrderValue: 150000,
            orderStartTime: "2024-07-01 06:00",
            orderEndTime: "2024-12-31 23:59",
            deliveryStartTime: "2024-07-01 06:00",
            deliveryEndTime: "2024-12-31 23:59",
            applicableFor: ["Thực phẩm tươi sống"],
            notApplicableFor: ["Đồ khô", "Thực phẩm chế biến sẵn"],
            expirationDate: "2024-12-31 23:59",
            note: "Không áp dụng cho các sản phẩm khuyến mãi.",
        }
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={voucherData}
                renderItem={({ item, index }) => (
                    <View>
                        <Text style={styles.voucherTitle} numberOfLines={1} ellipsizeMode="tail">
                            Nhập "{item.code}": {item.description}
                        </Text>
                        <Text>{item.minimumOrderValue}</Text>
                        <Text>{item.orderStartTime} {item.orderEndTime}</Text>
                        <Text>{item.deliveryStartTime} {item.deliveryEndTime}</Text>
                        <Text>{item.applicableFor}</Text>
                        <Text>{item.notApplicableFor}</Text>
                        <Text>{item.expirationDate}</Text>
                        <Text>Số lượng có hạn</Text>
                        <Text>{item.note}</Text>
                    </View>
                )}
                keyExtractor={item => item.id.toString()}
                numColumns={1}
                scrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 120,
        margin: 10,
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
    }
});

