import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getShopById } from '../../../api/adminApi';

const Home = ({navigation,route}) => {

    return (
        <SafeAreaView>
            <View style={[styles.row,styles.header]}>
            <Text style={[styles.shopName]}>name</Text>
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
                    <TouchableOpacity style={[styles.function]} onPress={()=>navigation.navigate('Rating')}>
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
                    <TouchableOpacity style={[styles.function,]} onPress={() => navigation.navigate('Default')}>
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
