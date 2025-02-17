import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Alert, FlatList } from 'react-native';
import ItemCard from './ItemCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getVouchersByShop } from "../../../../api/systemApi";
import { useFocusEffect } from '@react-navigation/native';
import ListItem from '../../../shopowner/screen/ListItem';

export default function VoucherList({ navigation, route }) {
    const { shop } = route.params;
    const [voucher, setvoucher] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchVoucher = async () => {
        setLoading(true);
        try {
            const response = await getVouchersByShop(shop.id);
            setvoucher(response.result || []);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (shop?.id) {
                fetchVoucher();
            }
        }, [shop?.id])
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Danh sách Voucher</Text>
                <Text style={styles.headerTitle}></Text>
                {/* Bạn có thể thêm các nút hoặc icon khác vào header nếu cần */}
            </View>
            <FlatList
                data={voucher}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => console.log('edit')}>
                        <ListItem type={'voucher'} item={item} navigation={navigation}
                            handlePress={() => navigation.navigate('AddVoucher', { shop: shop, voucher: item })}>
                        </ListItem>
                    </TouchableOpacity>
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={1}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddVoucher", { shop: shop, voucher: null })}>
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        top: 50
    },
    button: {
        width: 60, // Đường kính của nút
        height: 60,
        borderRadius: 30, // Đảm bảo nút tròn
        backgroundColor: '#E95322', // Màu nền nút
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', // Đặt vị trí tuyệt đối
        right: 16, // Cách cạnh phải 16px
        bottom: 66, // Cách cạnh dưới 16px
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5, // Hiệu ứng nổi (chỉ áp dụng cho Android)
    },
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
});

