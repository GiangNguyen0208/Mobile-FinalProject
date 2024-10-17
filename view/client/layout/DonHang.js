import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DonHang = () => {
  const navigation = useNavigation(); // Hook for navigation
  const [orderItems, setOrderItems] = useState([
    {
      id: '1',
      name: 'Order 1',
      price: 100,
      orderDate: '2024-10-01', // Ngày đặt
      expectedDeliveryDate: '2024-10-05', // Ngày giao dự kiến
      deliveryAddress: '123 Đường ABC, Thành phố XYZ', // Địa chỉ nhận
      phoneNumber: '037147258', // Số điện thoại
      details: 'Detail for Order 1',
      products: [
        { productId: 'p1', productName: 'Product A', productPrice: 50, quantity: 2 },
        { productId: 'p2', productName: 'Product B', productPrice: 50, quantity: 1 },
      ],
    },
    // ... (Các đơn hàng khác)
    {
      id: '2',
      name: 'Order 2',
      price: 60,
      orderDate: '2024-10-02',
      expectedDeliveryDate: '2024-10-06',
      deliveryAddress: '456 Đường DEF, Thành phố XYZ',
      phoneNumber: '037147259',
      details: 'Detail for Order 2',
      products: [
        { productId: 'p3', productName: 'Product C', productPrice: 30, quantity: 1 },
        { productId: 'p4', productName: 'Product D', productPrice: 30, quantity: 2 },
      ],
    },
    {
      id: '3',
      name: 'Order 3',
      price: 150,
      orderDate: '2024-10-03',
      expectedDeliveryDate: '2024-10-07',
      deliveryAddress: '789 Đường GHI, Thành phố XYZ',
      phoneNumber: '037147260',
      details: 'Detail for Order 3',
      products: [
        { productId: 'p5', productName: 'Product E', productPrice: 75, quantity: 1 },
        { productId: 'p6', productName: 'Product F', productPrice: 75, quantity: 1 },
      ],
    },
    {
      id: '4',
      name: 'Order 4',
      price: 120,
      orderDate: '2024-10-04',
      expectedDeliveryDate: '2024-10-08',
      deliveryAddress: '101 Đường JKL, Thành phố XYZ',
      phoneNumber: '037147261',
      details: 'Detail for Order 4',
      products: [
        { productId: 'p7', productName: 'Product G', productPrice: 40, quantity: 2 },
        { productId: 'p8', productName: 'Product H', productPrice: 40, quantity: 1 },
      ],
    },
    {
      id: '5',
      name: 'Order 5',
      price: 200,
      orderDate: '2024-10-05',
      expectedDeliveryDate: '2024-10-09',
      deliveryAddress: '202 Đường MNO, Thành phố XYZ',
      phoneNumber: '037147262',
      details: 'Detail for Order 5',
      products: [
        { productId: 'p9', productName: 'Product I', productPrice: 100, quantity: 2 },
        { productId: 'p10', productName: 'Product J', productPrice: 100, quantity: 1 },
      ],
    },
  ]);

  const calculateTotal = () => {
    return orderItems.reduce((total, order) => total + order.price, 0);
  };

  const handleViewDetails = (item) => {
    // Chuyển tới trang chi tiết đơn hàng và truyền dữ liệu đơn hàng qua navigation
    navigation.navigate('ChiTietDonHang', { order: item });
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productText}>{item.productName}</Text>
      <Text style={styles.productText}>${item.productPrice} x {item.quantity}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemText}>Tổng: ${item.price}</Text>
        {/* Hiển thị danh sách các sản phẩm trong đơn hàng */}
        <FlatList
          data={item.products}
          renderItem={renderProductItem}
          keyExtractor={(product) => product.productId}
        />
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
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng tất cả: ${calculateTotal()}</Text>
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
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  itemText: {
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
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default DonHang;
