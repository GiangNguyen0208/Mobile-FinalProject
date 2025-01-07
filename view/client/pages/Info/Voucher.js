import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const Voucher = () => {
    // Giả sử dữ liệu voucher là một mảng các đối tượng
    const [vouchers, setVouchers] = useState([]);

    // Dữ liệu giả lập cho ví voucher
    const mockVouchers = [
        { id: '1', name: 'Voucher 1', value: '50% Off' },
        { id: '2', name: 'Voucher 2', value: '10% Off' },
        { id: '3', name: 'Voucher 3', value: 'Free Shipping' },
    ];

    // Simulate fetching data
    useEffect(() => {
        setVouchers(mockVouchers);
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.voucherItem}>
            <Image
                source={require('../../../../assets/img/icons8-voucher-48.png')}
                style={styles.voucherImage}
            />
            <View style={styles.voucherDetails}>
                <Text style={styles.voucherName}>{item.name}</Text>
                <Text style={styles.voucherValue}>{item.value}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ví Voucher</Text>
            {vouchers && vouchers.length > 0 ? (
                <FlatList
                    data={vouchers}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={styles.noVouchersText}>Chưa có voucher nào!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    voucherItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    voucherImage: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    voucherDetails: {
        flex: 1,
    },
    voucherName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    voucherValue: {
        fontSize: 16,
        color: '#888',
    },
    noVouchersText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
    },
});

export default Voucher;
