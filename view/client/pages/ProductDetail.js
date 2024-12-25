import {Image, View, StyleSheet, Dimensions, TouchableOpacity, Text, SafeAreaView, StatusBar} from "react-native";
import defStyles from '../../../public/client/stylesheet/default.style';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from "@expo/vector-icons/Entypo";
import indexSt from "../../../public/client/stylesheet/index.style";
import React from "react";


const { width, height } = Dimensions.get('window');
const ProductDetail=({ route ,navigation})=>{
    const { item } = route.params;

    return(
        <SafeAreaView style={defStyles.container}>
            <View>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={32} color="black" />
                </TouchableOpacity>
                <View>
                    <Image source={item.img} style={[styles.image]} />
                </View>
                <View style={styles.itemInfo}>
                    <Text style={[styles.itemName]}>{item.name}</Text>
                    <Text style={[styles.itemName,styles.itemDes]}>very good</Text>
                    <View style={styles.row}>
                        <Text style={styles.price}>{item.price} đ</Text>
                        <TouchableOpacity >
                            <Entypo name="squared-plus" color="#E95322" style={[styles.alignSelf, styles.itemName]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.border_bot}></View>
                </View>
            </View>
        </SafeAreaView>
    )}
const styles = StyleSheet.create({
    border_bot:{
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderRadius: 8,
        marginVertical:10,
        width:'100%',
    },
    image: {
        width: width,
        height: height * 0.35,
        resizeMode: 'cover',
        position: 'relative',
        top: -50,
        left: 0,
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    backButton: {
        position: 'relative',
        top:24,
        left: 10,
        padding: 8,
        zIndex: 1,
    },
    col:{
        flexDirection:"column",
        justifyContent:"space-around"
    },
    itemInfo:{
        marginTop:-24,
        marginHorizontal:12
    },
    itemName:{
        fontSize:24,
        fontWeight:'600'
    },
    itemDes:{
        marginVertical: 10,
        fontSize:16,
        fontWeight:null
    },
    price:{
        fontSize:20,
        fontWeight:'600',
        color:'#E95322',
    },
    alignSelf:{
      paddingVertical:2
    },
})
export default ProductDetail;
