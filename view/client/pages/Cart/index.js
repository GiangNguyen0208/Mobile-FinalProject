import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { updateCart, removeFromCart, viewCart } from '../../../../api/cartApi';  

const Cart = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await viewCart();
                setCartItems(cartData.result);
                const total = cartData.result.reduce((sum, item) => sum + item.totalPrice, 0);
                setTotalAmount(total);
            } catch (error) {
                console.error('Error loading cart:', error);
            }
        };
        fetchCart();
    }, []); 


    const updateCartProduct = async (cartData) => {
        try {
            const response = await updateCart(cartData);
            console.log(response);
            const updatedCart = await viewCart();
            setCartItems(updatedCart.result);
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const removeItem = async (productId) => {
        try {
            const response = await removeFromCart(productId);
            console.log(response);
            const updatedCart = await viewCart();
            setCartItems(updatedCart.result);
            const total = updatedCart.result.reduce((sum, item) => sum + item.totalPrice, 0);
            setTotalAmount(total);
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const changeQuantity = async (item, operation) => {
        const updatedItem = { ...item };
        if (operation === 'increase') updatedItem.quantity += 1;
        else if (operation === 'decrease' && updatedItem.quantity > 1) updatedItem.quantity -= 1;
    
        const cartRequest = { productId: item.idProduct, quantity: updatedItem.quantity };
        console.log(cartRequest);
    
        try {
            const response = await updateCartProduct(cartRequest);
        } catch (error) {
            console.error("Error updating cart: ", error);
            alert("Error updating cart.");
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.idProduct.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={styles.productInfo}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                            />
                            <View style={styles.productDetails}>
                                <Text style={styles.productText}>{item.name}</Text>
                                <Text style={styles.productText}>${item.price}</Text>
                            </View>
                        </View>
                        <View style={styles.quantityControls}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => changeQuantity(item, 'decrease')}
                            >
                                <Text style={styles.buttonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => changeQuantity(item, 'increase')}
                            >
                                <Text style={styles.buttonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeItem(item.idProduct)}
                        >
                            <Icon name="delete" size={20} color="#fff" /> 
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Text style={styles.total}>Total: {totalAmount} VND</Text>
            <TouchableOpacity
                style={styles.checkOut}
                onPress={() => navigation.navigate('Checkout')}
            >
                <Text style={styles.checkOutText}>Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 15,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    productInfo: {
        flexDirection: 'row',
        flex: 1,
    },
    productImage: {
        width: 40,
        height: 40,
        borderRadius: 10,
        marginRight: 10,
    },
    productDetails: {
        justifyContent: 'center',
        flex: 1,
    },
    productText: {
        fontSize: 16,
        marginBottom: 5,
        flexWrap: 'nowrap', 
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    quantityButton: {
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#ddd',
        marginHorizontal: 5,
    },
    quantityText: {
        fontSize: 18,
        marginHorizontal: 10,
    },
    removeButton: {
        backgroundColor: '#e80b0b',
        borderRadius: 5,
        paddingHorizontal: 4,
        paddingVertical: 6,
        alignItems: 'center',
        alignSelf: 'center', 
    },    
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 20,
    },
    checkOut: {
        backgroundColor: '#e80b0b',
        borderRadius: 5,
        padding: 16,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkOutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Cart;
