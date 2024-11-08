import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
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
        { productId: 'p1', productName: 'Product A', productPrice: 50, quantity: 2, image: require('../../../assets/favicon.png') },
        { productId: 'p2', productName: 'Product B', productPrice: 50, quantity: 1, image: require('../../../assets/test1.png') },
      ],
    },
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
        { productId: 'p3', productName: 'Product C', productPrice: 30, quantity: 1, image: require('../../../assets/test1.png') },
        { productId: 'p4', productName: 'Product D', productPrice: 30, quantity: 2, image: require('../../../assets/favicon.png') },
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
      <Image source={item.image} style={styles.productImage} />
      <View>
        <Text style={styles.productText}>{item.productName}</Text>
        <Text style={styles.productText}>${item.productPrice} x {item.quantity}</Text>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
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

export default DonHang;
