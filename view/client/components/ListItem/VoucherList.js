import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text, Alert, FlatList} from 'react-native';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function VoucherList({navigation}) {
    const voucherData = [
        {
            id:1,
            code: "FREESHIP50",
            description: "Miễn phí vận chuyển từ 50k.",
            minimumOrderValue: 50000, // Giá trị đặt hàng tối thiểu
            orderStartTime: "2024-10-01", // Thời gian bắt đầu áp dụng đặt hàng
            orderEndTime: "2024-12-31",   // Thời gian kết thúc áp dụng đặt hàng
            deliveryStartTime: "2024-10-01", // Thời gian bắt đầu áp dụng giao hàng
            deliveryEndTime: "2024-12-31",   // Thời gian kết thúc áp dụng giao hàng
            applicableFor: ["Tất cả sản phẩm"],  // Áp dụng cho những đối tượng
            notApplicableFor: ["Đồ điện tử", "Hàng cồng kềnh"], // Không áp dụng cho những đối tượng
            expirationDate: "2024-12-31 23:59",  // Hạn sử dụng voucher
            note: "Voucher không áp dụng cùng với các mã giảm giá khác.",
        },
        {
            id:2,
            code: "DISCOUNT20",
            description: "Giảm 20% cho đơn từ 100k.",
            minimumOrderValue: 100000,
            orderStartTime: "2024-10-10",
            orderEndTime: "2024-12-31",
            deliveryStartTime: "2024-10-10",
            deliveryEndTime: "2024-12-31",
            applicableFor: ["Quần áo", "Giày dép"],
            notApplicableFor: ["Phụ kiện công nghệ"],
            expirationDate: "2024-12-31 22:00",
            note: "Voucher không áp dụng với sản phẩm đang giảm giá.",
        },
        {
            id:3,
            code: "BUY1GET1",
            description: "Mua 1 tặng 1 các mặt hàng.",
            minimumOrderValue: 50000,
            orderStartTime: "2024-11-01",
            orderEndTime: "2024-11-30",
            deliveryStartTime: "2024-11-01",
            deliveryEndTime: "2024-11-30",
            applicableFor: ["Thời trang nam", "Thời trang nữ"],
            notApplicableFor: ["Hàng phụ kiện", "Giày dép"],
            expirationDate: "2024-11-30 23:59",
            note: "Voucher chỉ áp dụng cho sản phẩm không giảm giá.",
        },
        {
            id:4,
            code: "SUMMER10",
            description: "Giảm 10% cho đơn từ 200k.",
            minimumOrderValue: 200000,
            orderStartTime: "2024-06-01",
            orderEndTime: "2024-09-30",
            deliveryStartTime: "2024-06-01",
            deliveryEndTime: "2024-09-30",
            applicableFor: ["Đồ gia dụng", "Thực phẩm"],
            notApplicableFor: ["Hàng công nghệ", "Thiết bị điện tử"],
            expirationDate: "2024-09-30 23:59",
            note: "Áp dụng khi thanh toán qua ví điện tử.",
        },
        {
            id:5,
            code: "FRESHFOOD15",
            description: "Giảm 15% cho đơn từ 150k.",
            minimumOrderValue: 150000,
            orderStartTime: "2024-07-01",
            orderEndTime: "2024-12-31",
            deliveryStartTime: "2024-07-01",
            deliveryEndTime: "2024-12-31",
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
                    <View style={[styles.voucherContainer, styles.border_bot]}>
                        <View style={{flexDirection:'row',marginVertical:16,}}>
                            <FontAwesome5 name="tag" size={16} color='#E95322' />
                            <Text style={styles.voucherTitle} numberOfLines={1} ellipsizeMode="tail">
                                Nhập "{item.code}": {item.description}
                            </Text>
                        </View>
                        <Text style={styles.voucherText}>Đặt tối thiểu: {item.minimumOrderValue}đ</Text>
                        <Text style={styles.voucherText}>Thời gian áp dụng đặt hàng: từ{item.orderStartTime} đến {item.orderEndTime}</Text>
                        <Text style={styles.voucherText}>Thời gian áp dụng giao hàng: từ {item.deliveryStartTime} đến {item.deliveryEndTime}</Text>
                        <Text style={styles.voucherText}>Áp dụng cho: {item.applicableFor}</Text>
                        <Text style={styles.voucherText}>Không áp dụng cho: {item.notApplicableFor}</Text>
                        <Text style={styles.voucherText}>HSD: {item.expirationDate}</Text>
                        <Text style={styles.voucherText}>Số lượng có hạn</Text>
                        <Text style={styles.voucherText}>{item.note}</Text>
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
    voucherTitle:{
        fontSize:16,
        lineHeight:18,
        left:8,
    },
    border_bot:{
        borderBottomWidth: 0.3,
        borderBottomColor: '#f0f0f0 ',
        width:'95%',
        alignSelf:"center",
    },
});

