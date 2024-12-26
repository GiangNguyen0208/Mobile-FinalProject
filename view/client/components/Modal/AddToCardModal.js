import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, Button, Image, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from '@expo/vector-icons/AntDesign';
import indexSt from "../../../../public/client/stylesheet/index.style";
const AddToCartModal = ({ item, visible, onClose }) => {
        const [quantity, setQuantity] = useState(1);

        const increaseQuantity = () => {
            setQuantity(quantity + 1);
        };

        const decreaseQuantity = () => {
            if (quantity > 1) {
                setQuantity(quantity - 1);
            }
        };


        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={[styles.row, styles.border_bot]}>
                            <Text style={styles.addTitle}>Thêm món mới</Text>
                            <Ionicons style={styles.closeIcon} onPress={onClose} name="close" size={32} color="black"/>
                        </View>
                        <View style={[styles.row, styles.itemContainer]}>
                            <Image source={item.img} style={styles.image}/>
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.name}</Text>
                                <View style={[styles.priceContainer, styles.row]}>
                                    <Text style={styles.price}>{item.price.toFixed(2)} đ</Text>
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={decreaseQuantity}>
                                            <AntDesign name="minussquareo" style={[indexSt.title, styles.alignSelf]} color="#E95322" />
                                        </TouchableOpacity>
                                        <Text style={{marginHorizontal:8,alignSelf:'center',fontSize:16}}>{quantity}</Text>
                                        <TouchableOpacity onPress={increaseQuantity}>
                                            <AntDesign name="plussquare" style={[indexSt.title, styles.alignSelf]} color="#E95322" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.footerContainer}>
                            <View style={styles.footer}>
                                <TouchableOpacity onPress={onClose} style={styles.cartButton}>
                                    <Text style={styles.cartButtonText}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };


    const styles = StyleSheet.create({
        itemContainer: {
            overflow: 'hidden',
            width: '100%',
            justifyContent: 'space-between',
            height: 120,
            paddingVertical:8
        },
        info: {
            justifyContent: "space-between",
            flex: 7
        },
        name: {
            fontSize: 20,
            fontWeight: 'bold',
            left: 10
        },
        price: {
            fontSize: 20,
            color: '#E95322',
        },
        priceContainer: {
            marginHorizontal: 10,
            bottom: 4,
            justifyContent: "space-between",
        },
        image: {
            width: '40%',
            height: "100%",
            resizeMode: 'contain',
            marginBottom: 10,
        },
        row: {
            flexDirection: "row",
        },
        modalOverlay: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            marginHorizontal: -20
        },
        modalContent: {
            position: 'absolute',
            width: '100%',
            height: '80%',
            backgroundColor: '#fff',
            borderRadius: 8,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
            bottom: 0,
        },
        modalText: {
            fontSize: 18,
            marginBottom: 20,
        },
        footerContainer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTopWidth: 0.5, // Tạo border top cho View chứa button
            borderTopColor: '#ddd',
            backgroundColor: '#fff',
            elevation: 10,
        },
        footer: {
            alignItems: 'center',
            paddingVertical: 10,
        },
        cartButton: {
            backgroundColor: '#E95322',
            paddingVertical: 8,
            paddingHorizontal: 30,
            borderRadius: 8,
            width: '95%'
        },
        cartButtonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
        },

        border_bot: {
            borderBottomWidth: 0.5,
            borderBottomColor: 'black',
            marginBottom: 12,
            width: '100%',
            justifyContent: 'space-between',
            height: 32
        },
        closeIcon: {
            top: -10,
            right: 8
        },
        addTitle: {
            top: -6,
            textAlign: 'center',
            marginLeft: '35%',
            fontSize: 20
        }
    })
export default AddToCartModal;
