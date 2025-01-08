import {Animated, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProduct=({ route ,navigation})=>{
    const {item}  = route.params;
    const [text, setText] = useState('');
    const handleChangeText = (inputText) => {
        setText(inputText);
    };

    return (
        <SafeAreaView>
            <View style={{height:'100%',backgroundColor:'white',top:16}}>
                <View style={[styles.row,styles.info,]}><Text>Ảnh món</Text><Image source={item.img} style={[styles.image,{height:50,width:50}]}></Image></View>
                <View style={[styles.row,styles.info]}><Text>Tên món</Text><Text>{item.name}</Text></View>
                <View style={[styles.row,styles.info]}><Text>Giá</Text><Text>{item.price}</Text></View>
                <View style={[styles.row,styles.info]}><Text>Danh mục</Text><Text>{item.categoryName}</Text></View>
                <View style={[styles.row,styles.info]}>
                    <Text >Còn hàng</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#4cd137" }}
                        thumbColor={'white'}
                        value={item.quantity > 0 ? true : false}
                        style={{
                            transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], 
                        }}
                    />
                </View>
                <View style={[styles.info]}>
                    <Text>Mô tả</Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={handleChangeText}
                    value={item.description}
                    placeholder="Không bắt buộc"
                    />
                </View>
                <View>
                    <TouchableOpacity style={[styles.addFoodBtn,{marginHorizontal:10 }]}>
                        <Text style={{color:"white",fontSize:16,textAlign:'center'}}>Xóa món khỏi thực đơn</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.addFoodBtn}>
                    <Text style={{color:"white",fontSize:16,textAlign:'center'}}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );}



const styles = StyleSheet.create({
    image: {
        resizeMode:'contain',
        width: '100%', // Chiếm hết chiều rộng của card
        height: '100%', // Đặt chiều cao cho hình ảnh
    },
    info:{
        justifyContent:'space-between',
        margin:16,
        borderBottomWidth:0.5,
    },
    row: {
        flexDirection: 'row',
    },
    btnContainer: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 5,
        height: 80,
        position: 'absolute',
        bottom: 0,
    },
    addFoodBtn: {
        width: '95%',
        paddingVertical: 8,
        marginVertical: 14,
        backgroundColor: '#E95322',
        borderRadius: 8,
    },
            input: {
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            width: '100%',
            marginBottom: 20,
            paddingLeft: 10,
            borderRadius: 5,
        },
})

export default EditProduct;
