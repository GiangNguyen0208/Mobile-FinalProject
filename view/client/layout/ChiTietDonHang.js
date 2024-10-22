import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';

const ChiTietDonHang = ({ route, navigation }) => {
  // Kiểm tra nếu route hoặc route.params không có thông tin đơn hàng
  if (!route || !route.params || !route.params.order) {
    return <Text>Thông tin đơn hàng không khả dụng</Text>;
  }

  const { order } = route.params;

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

  // Hàm xử lý điều hướng sang trang ThanhToan.js
  const handlePayment = () => {
    // Chuyển sang trang ThanhToan với tham số order
    navigation.navigate('ThanhToan', { order });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi Tiết Đơn Hàng</Text>
      <Text style={styles.orderDetailText}>Mã đơn hàng: {safeString(order.id)}</Text>
      <Text style={styles.orderDetailText}>Tổng tiền: ${safeString(order.price)}</Text>
      <Text style={styles.orderDetailText}>Ngày đặt: {safeString(order.orderDate)}</Text>
      <Text style={styles.orderDetailText}>Ngày giao dự kiến: {safeString(order.expectedDeliveryDate)}</Text>
      <Text style={styles.orderDetailText}>Địa chỉ nhận: {safeString(order.deliveryAddress)}</Text>
      <Text style={styles.orderDetailText}>Số điện thoại: {safeString(order.phoneNumber)}</Text>

      {/* Danh sách sản phẩm trong đơn hàng */}
      <FlatList
        data={order.products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.productId.toString()}
      />

      {/* Nút "Thanh Toán" */}
      <Button title="Thanh Toán" onPress={handlePayment} />
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

export default ChiTietDonHang;
