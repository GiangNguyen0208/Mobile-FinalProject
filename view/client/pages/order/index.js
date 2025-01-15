import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Shipping from '../../components/Order/shipping';
import History from '../../components/Order/history';
import { getOrderListDone, getOrderListPedding } from '../../../../api/shopApi';

const Order = () => {
  const [historyOrders, setHistoryOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [selectedOption, setSelectedOption] = useState('shipping');
  const [loading, setLoading] = useState(true); // Thêm loading state
  const [error, setError] = useState(null); // Thêm trạng thái lỗi

  useEffect(() => {
    const fetchHistoryAndShippingOrder = async () => {
      try {
        const historys = await getOrderListDone();
        const shippings = await getOrderListPedding();
        setHistoryOrders(historys.result || []);
        setShippingOrders(shippings.result || []);
      } catch (err) {
        setError('Failed to fetch orders'); // Xử lý lỗi
      } finally {
        setLoading(false); // Đảm bảo trạng thái loading được cập nhật sau khi API trả về
      }
    };

    fetchHistoryAndShippingOrder();
    const intervalId = setInterval(fetchHistoryAndShippingOrder, 30000); // Gọi lại API mỗi 30 giây

    return () => clearInterval(intervalId); // Dọn dẹp khi component unmount
  }, []); // Chỉ gọi khi component mount

  const navRoutes = [
    { key: 'shipping', title: 'Shipping' },
    { key: 'history', title: 'History' },
  ];

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#007BFF" />; // Hiển thị loading spinner
    }

    if (error) {
      return <Text style={styles.errorText}>{error}</Text>; // Hiển thị lỗi nếu có
    }

    switch (selectedOption) {
      case 'shipping':
        return <Shipping items={shippingOrders} />;
      case 'history':
        return <History items={historyOrders} />;
      default:
        return <Shipping items={shippingOrders} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>My Orders</Text>

      {/* Thanh điều hướng */}
      <View style={styles.navContainer}>
        {navRoutes.map((route) => (
          <TouchableOpacity
            key={route.key}
            style={[
              styles.navItem,
              selectedOption === route.key && styles.activeNavItem,
            ]}
            onPress={() => setSelectedOption(route.key)}
          >
            <Text
              style={[
                styles.navText,
                selectedOption === route.key && styles.activeNavText,
              ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nội dung */}
      <View style={styles.contentContainer}>{renderContent()}</View>
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
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF', // Màu nền trắng
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // Đường viền nhẹ nhàng
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  activeNavItem: {
    backgroundColor: '#007BFF', // Màu nền khi chọn
  },
  navText: {
    fontSize: 16,
    color: '#555',
  },
  activeNavText: {
    color: '#FFFFFF', // Màu chữ khi chọn
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#FFFFFF', // Nền trắng cho nội dung chính
    borderRadius: 8, // Bo góc
    shadowColor: '#000', // Hiệu ứng bóng
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Đổ bóng trên Android
    paddingVertical: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingTop: 20,
  },
});

export default Order;
