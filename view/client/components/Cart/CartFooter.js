import React, { useState, useRef } from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, Animated, Button, FlatList} from 'react-native';
import CartIcon from "./CartIcon";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from "react-native-vector-icons/Ionicons";
import ItemInCart from "./ItemInCart";

export default function App() {
    const [isModal1Visible, setModal1Visible] = useState(false);
    const [isModal2Visible, setModal2Visible] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleModal2 = () => {
        if (isModal2Visible) {
            // Animate collapse
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setModal2Visible(false));
        } else {
            setModal2Visible(true);
            // Animate expand
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const modal2Height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 360], // Chiều cao của modal mở rộng
    });

    const items = [
        {
            id: 1,
            name: "Sản phẩm 1",
            price: 100000,
        },
        {
            id: 2,
            name: "Sản phẩm 2",
            price: 150000,
        },
        {
            id: 3,
            name: "Sản phẩm 3",
            price: 200000,
        },
        {
            id: 4,
            name: "Sản phẩm 4",
            price: 250000,
        },
        {
            id: 5,
            name: "Sản phẩm 5",
            price: 300000,
        },
    ];

    return (
        <View style={styles.container}>
            <Button title={"on"} onPress={()=> setModal1Visible(true)}></Button>
            {/* Modal 1 */}
            <Modal
                transparent
                visible={isModal1Visible}
                animationType="slide"
                onRequestClose={() => setModal1Visible(false)}
            >
                <View style={styles.modal1Container}>
                    <TouchableOpacity onPress={toggleModal2} style={{left:32,}}>
                        <View style={{flexDirection:'row'}}>
                            <CartIcon itemCount={1}></CartIcon>
                            <View>
                                <Text></Text>
                                <Text></Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemText}>
                        <Text style={{color:"white",fontSize:16}}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal 2 với animation */}
                {isModal2Visible && (
                    <Animated.View style={[styles.modal2Container, { height: modal2Height }]}>
                        <View style={[styles.row, styles.border_bot,styles.modal2header]}>
                            <TouchableOpacity>
                                <Text style={styles.deleteAll}>Xóa tất cả</Text>
                            </TouchableOpacity>
                            <Text style={styles.modal2Title}>Giỏ hàng</Text>
                            <Ionicons style={styles.closeIcon} onPress={toggleModal2} name="close" size={32} color="black"/>
                        </View>
                        <FlatList
                            data={items}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <ItemInCart item={item} />}
                        />
                    </Animated.View>
                )}
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    modal1Container: {
        flexDirection:"row",
        justifyContent:'space-between',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 5,
        height:85,
    },
    modal2Container: {
        position: 'absolute',
        bottom: 85, // Vị trí modal 2 ở phía trên modal 1
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 1,
        height: 240,
    },
    itemText: {
        backgroundColor: "#E95322",
        paddingHorizontal:48,
        paddingVertical: 20,
        height:'100%',
        textAlign:"center"
    },
    closeText: {
        color: 'red',
        marginTop: 20
    },
    border_bot: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        marginBottom: 12,
        width: '100%',
        justifyContent: 'space-between',
    },
    closeIcon: {
        top: -4,
        right: 8,
        paddingVertical: 2,
    },
    modal2Title: {
        textAlign: 'center',
        fontSize: 20,
        right: 16,
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 5,
    },
    modal2header:{
        height: 40,
    },
    deleteAll:{
        color:'#E95322',
        paddingVertical: 6,
        left:8,
    },
});
