import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ChiTietDonHang = ({ route }) => {
  // Lấy thông tin đơn hàng từ route
  const { order } = route.params;

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productText}>{item.productName}</Text>
      <Text style={styles.productText}>
        ${item.productPrice} x {item.quantity}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi Tiết Đơn Hàng</Text>
      <Text style={styles.orderDetailText}>Mã đơn hàng: {order.id}</Text>
      <Text style={styles.orderDetailText}>Tổng tiền: ${order.price}</Text>

      <FlatList
        data={order.products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.productId}
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  productText: {
    fontSize: 16,
  },
});

export default ChiTietDonHang;
