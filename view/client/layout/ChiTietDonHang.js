import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const ChiTietDonHang = ({ route, navigation }) => {
  // Kiểm tra nếu 'order' không tồn tại
  if (!route || !route.params || !route.params.order) {
    return <Text>Thông tin đơn hàng không khả dụng</Text>;
  }

  const { order } = route.params;

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productText}>{safeString(item.productName)}</Text>
      <Text style={styles.productText}>
        {`$${safeString(item.productPrice)} x ${safeString(item.quantity)}`}
      </Text>
    </View>
  );

  // Hàm kiểm tra và trả về giá trị chuỗi
  const safeString = (value) => {
    return value !== undefined && value !== null ? String(value) : '';
  };

  const handlePayment = () => {
    // Chuyển đến trang thanh toán
    navigation.navigate('ThanhToan', { order }); // Truyền dữ liệu đơn hàng nếu cần
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

      <FlatList
        data={order.products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.productId}
      />

      {/* Nút thanh toán */}
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
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  productText: {
    fontSize: 16,
  },
});

export default ChiTietDonHang;
