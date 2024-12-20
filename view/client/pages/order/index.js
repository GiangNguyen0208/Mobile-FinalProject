import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NavigationTop from '../../components/Navigation/NavigationTop';
import Status from '../../components/Order/status';
import RecommendedProducts from '../../components/Order/recommendProducts';
import DropDown from '../../components/DropDown/dropDown';

const Order = () => {
  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>My Orders</Text>

      {/* Thanh điều hướng trên cùng */}
      <View style={styles.navigationTop}>
        <NavigationTop />
      </View>

      {/* Nội dung chính */}
      <View style={styles.mainContent}>
        {/* Menu thả xuống */}
        <DropDown />

        {/* Thanh trạng thái */}
        <Status />

        {/* Sản phẩm được đề xuất */}
        <RecommendedProducts />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Màu nền dịu nhẹ
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Màu chữ đậm
    textAlign: 'center',
    marginVertical: 16, // Khoảng cách trên và dưới
  },
  navigationTop: {
    height: 60,
    backgroundColor: '#FFFFFF', // Màu nền trắng
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Đường viền nhẹ nhàng
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  mainContent: {
    flex: 1,
    marginTop: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF', // Nền trắng cho nội dung chính
    borderRadius: 8, // Bo góc
    shadowColor: '#000', // Hiệu ứng bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Đổ bóng trên Android
    paddingVertical: 16,
  },
});

export default Order;
