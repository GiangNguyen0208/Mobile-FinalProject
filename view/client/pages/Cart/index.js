import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const Cart = ({ navigation }) => {
    // Giả sử bạn lưu trữ giỏ hàng dưới dạng một mảng
    const [cartItems, setCartItems] = useState([
        { id: '1', name: 'Product 1', price: 20 },
        { id: '2', name: 'Product 2', price: 30 },
        { id: '3', name: 'Product 3', price: 40 },
    ]);

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>${item.price}</Text>
                        <Button title="Remove" onPress={() => removeItem(item.id)} />
                    </View>
                )}
            />
            <Text style={styles.total}>Total: ${totalAmount}</Text>
            <Button
                title="Proceed to Checkout"
                onPress={() => navigation.navigate('Checkout')} // Điều hướng đến trang Checkout
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        marginBottom: 15,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default Cart;
