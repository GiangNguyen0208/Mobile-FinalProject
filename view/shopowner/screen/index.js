import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { getShopById } from '../../../api/shopApi';
import { useAuth } from '../../context/Auth/AuthContext';
const Home = ({navigation}) => {
    const {shopId} = useAuth();
    const [shop, setShop] = useState([]);
     useEffect(() => {
            const fetchshop = async () => {
                try {
                    // Gọi API lấy dữ liệu theo shop id
                    const shopData = await getShopById(shopId);
                    setShop(shopData);
                    console.log(shopData);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
    
            fetchshop(); // Gọi hàm fetchProductsAndCategories
        }, [shopId]);
    
        useEffect(() => {
            console.log("Fetched data:", shop); // Log dữ liệu của products
        }, [shop]);

    return (
        <SafeAreaView>
            <View style={[styles.row,styles.header]}>
            <Text style={[styles.shopName]}>{shop.name ? shop.name.toUpperCase() : ''}</Text>
                <TouchableOpacity style={[styles.personalAndNoti]} onPress={() => navigation.navigate('EditProfile', { shopId: shop.id })}>
                    <Ionicons name="person-circle-outline" size={32} color="black" />
                </TouchableOpacity>
            </View>
            <View style={[styles.banner]}>
                <Image
                    source={require("./../../../assets/img/img.png")}
                    style={[styles.image,{borderRadius: 15}]}
                    resizeMode="contain"
                />

            </View>
            <View style={styles.container}>
                <View style={[styles.row,{justifyContent:'space-around'}]}>
                    <TouchableOpacity style={[styles.function]}>
                        <Image
                            source={require("./../../../assets/img/order-food.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.funcName}>Đơn hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.function]} onPress={() => navigation.navigate('Rating', { shopId: shop.id })} >
                        <Image
                            source={require("./../../../assets/img/star.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.funcName}>Đánh giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.function]} onPress={()=>navigation.navigate('Menu')} >
                        <Image
                            source={require("./../../../assets/img/menu.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.funcName}>Thực đơn</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.row,{justifyContent:'space-around'}]}>
                    <TouchableOpacity style={[styles.function,]} onPress={() => navigation.navigate('Notification', { shop: shop })}>
                        <Image
                            source={require("./../../../assets/img/notification.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.funcName}>Thông báo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.function]}onPress={() => navigation.navigate('VoucherList', { shop: shop })}>
                        <Image
                            source={require("./../../../assets/img/voucher.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.funcName}>Khuyến mãi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.function]} ></TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',
    },
    header:{
        justifyContent:'space-between',
    },
    shopName:{
        fontSize: 20,
        left: 16,
        paddingVertical:6,
        color:"#E95322",
        fontWeight:600,
    },
    personalAndNoti:{
        right:20,
        paddingVertical:7,
    },
    container:{
        marginHorizontal:16,
        backgroundColor:'white',
        height:240,
        justifyContent:'space-around',
    },
    banner:{
        height: 100,
        marginHorizontal:16,
        marginBottom:10,
    },
    image:{
        width:'100%',
        height:'100%',
    },
    function:{
        height: 40,
        width: 80,
    },
    funcName:{
        textAlign:'center',
    },
})
export default Home;
