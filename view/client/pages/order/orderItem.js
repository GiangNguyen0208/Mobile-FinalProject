import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderItems = ({ orderItems }) => {

  console.log(orderItems);
  
  const navigation = useNavigation(); // Hook for navigation

  const calculateTotal = () => {
    return orderItems.reduce((total, order) => total + order.price, 0);
  };

  const handleViewDetails = (item) => {
    navigation.navigate('orderItem', { orderId: item.id });
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <View>
        <Text style={styles.productText}>{item.productName}</Text>
        <Text style={styles.productText}>${item.productPrice} x {item.quantity}</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>Total: ${item.price}</Text>
        <Text style={styles.itemText}>Order Date: {item.orderDate}</Text>
        <Text style={styles.itemText}>Expected Delivery: {item.expectedDeliveryDate}</Text>
        <Text style={styles.itemText}>Delivery Address: {item.deliveryAddress}</Text>
        {/* Display the list of products in the order */}
        {item.products && item.products.length > 0 ? (
          <FlatList
            data={item.products}
            renderItem={renderProductItem}
            keyExtractor={(product) => product.productId}
          />
        ) : (
          <Text style={styles.itemText}>No products available</Text>
        )}
      </View>
      <Button title="Chi tiết đơn hàng" onPress={() => handleViewDetails(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>
      <FlatList
        data={orderItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ${calculateTotal()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  itemInfo: {
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 5,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productText: {
    fontSize: 16,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default OrderItems;
