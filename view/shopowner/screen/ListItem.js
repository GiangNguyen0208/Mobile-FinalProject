import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
const ListItem = ({ type, item, handlePress }) => {

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={handlePress} style={styles.itemContent}>
                <View style={styles.textContainer}>
                {type === 'voucher' && (
                    <View style={[styles.voucherContainer]}>
                        <View style={{ flexDirection: 'row' }}>
                            <FontAwesome5 name="tag" size={16} color='#E95322' style={{ bottom: 8 }} />
                            <Text style={styles.voucherTitle} numberOfLines={1} ellipsizeMode="tail">
                                Nhập "{item.code}": giảm ngay {item.valueDiscount} %
                            </Text>
                        </View>
                        <Text style={styles.voucherText}>Đặt tối thiểu: {item.priceMin * 1000} đ</Text>
                        <Text style={styles.voucherText}>Số lượng có hạn</Text>
                    </View>
                )}
                {type === 'notification' && (
                    <View style={[styles.notiContainer]}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.description} numberOfLines={2}>{item.message}</Text>
                    </View>
                )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 8,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Tạo hiệu ứng bóng cho Android
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    notiContainer:{
        height: 80,
        padding: 16,
    },
    description: {
        fontSize: 14,
        color: '#777',
        marginBottom: 8,
    },
    voucherText: {
        flexWrap: 'wrap',
        lineHeight: 24,
    },
    voucherContainer: {
        height: 120,
        padding: 24,
    },
    voucherTitle: {
        fontSize: 16,
        lineHeight: 18,
        left: 8,
        bottom:8
    },
});

export default ListItem;
