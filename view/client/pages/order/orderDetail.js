import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';

const OrderDetail = ({ route, navigation }) => {
  const { orderId } = route.params;

  const order = findOrderById(orderId);

  if (!order) {
    return <Text>Thông tin đơn hàng không khả dụng</Text>;
  }

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productText}>{safeString(item.productName)}</Text>
        <Text style={styles.productText}>
          {`$${safeString(item.productPrice)} x ${safeString(item.quantity)}`}
        </Text>
      </View>
    </View>
  );

  const safeString = (value) => {
    return value !== undefined && value !== null ? String(value) : '';
  };

  const handlePayment = () => {
    navigation.navigate('ThanhToan', { order });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Detail</Text>
      <Text style={styles.orderDetailText}>Order ID: {safeString(order.id)}</Text>
      <Text style={styles.orderDetailText}>Total Price: ${safeString(order.price)}</Text>
      <Text style={styles.orderDetailText}>Order Date: {safeString(order.orderDate)}</Text>
      <Text style={styles.orderDetailText}>Received Date: {safeString(order.expectedDeliveryDate)}</Text>
      <Text style={styles.orderDetailText}>Address : {safeString(order.deliveryAddress)}</Text>
      <Text style={styles.orderDetailText}>Phone: {safeString(order.phoneNumber)}</Text>

      <FlatList
        data={order.products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.productId.toString()}
      />

      <Button title="Payment" onPress={handlePayment} />
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
  orderDetailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productInfo: {
    flexDirection: 'column',
  },
  productText: {
    fontSize: 16,
  },
});

export default OrderDetail;
