import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from "../../../api/constant";

const Home = ({navigation,route}) => {
    const  {id } = route.params;
    const [shop, setShop] = useState({});  // Khởi tạo state cho shop

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                // Gọi API để lấy tên shop từ shopId
                const response = await axios.get(`http://${URL.NET_ADDRESS}:8080/api/v1/admin/shop/id/${id}`);
                
                // Giả sử API trả về dữ liệu có tên shop trong trường 'name'
                const fetchedShop = response.data;
                console.log('API Response:', response.data);
                // Cập nhật shop với thông tin trả về
                setShop(fetchedShop.name); // Giả sử bạn chỉ muốn hiển thị tên shop
            } catch (error) {
                console.error('Error fetching shop data:', error);
            }
        };
        if (id) { // Kiểm tra shopId có hợp lệ không
            fetchShopData(); // Gọi hàm lấy dữ liệu
        }
    }, [id]); // useEffect sẽ chạy lại mỗi khi shopId thay đổi



    return (
        <SafeAreaView>
            <View style={[styles.row,styles.header]}>
            <Text style={[styles.shopName]}>{shop.name || 'Loading...'}</Text>
                <View style={[styles.row,styles.personalAndNoti]}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Ionicons name="person-circle-outline" size={24} color="black" />
                </View>
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
                    <TouchableOpacity style={[styles.function]}>
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
                    <TouchableOpacity style={[styles.function,]}>
                        <Image
                            source={require("./../../../assets/img/help-desk.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.funcName}>Hỗ trợ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.function]}>
                        <Image
                            source={require("./../../../assets/img/voucher.png")}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.funcName}>Khuyến mãi</Text>
                    </TouchableOpacity>
                    <View style={[styles.function]}></View>
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
    },
    personalAndNoti:{
        right:10,
        paddingVertical:7,
        justifyContent:'space-around',
        width: 80
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
