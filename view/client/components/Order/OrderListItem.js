import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

const OrderListItem = ({ item, onDetailPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Mã đơn hàng: {item.id}</Text>
        {item.status === 'PENDING' ? (
          <MaterialIcons name="local-shipping" size={24} color="#FF6F61" />
        ) : (
          <AntDesign name="checkcircle" size={24} color="green" />
        )}
      </View>
      {/* Chi tiết đơn hàng */}
      <Text style={styles.cardText}>Người dùng: {item.fullname} ({item.username})</Text>

      <Text style={[styles.cardText, item.status === 'PENDING' ? styles.pendingText : styles.completedText]}>
        Trạng thái: {item.status === 'PENDING' ? 'Đang giao hàng' : 'Đã nhận hàng'}
      </Text>

      <Text style={styles.cardText}>
        Ngày tạo: {new Date(item.createAt).toLocaleDateString()}
      </Text>

      <Text style={styles.cardText}>Giảm giá: {item.discount} VND</Text>

      <Text style={styles.cardText}>Số lượng sản phẩm: {item.totalProduct}</Text>

      <Text style={styles.cardAmount}>Tổng tiền: {item.amount} VND</Text>

      <TouchableOpacity style={styles.detailButton} onPress={() => onDetailPress(item.id)}>
        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  pendingText: {
    color: '#FF6F61', // Màu nổi bật cho trạng thái đang giao hàng
    fontWeight: 'bold',
  },
  completedText: {
    color: 'green', // Màu xanh cho trạng thái đã nhận hàng
    fontWeight: 'bold',
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722', // Màu cam nổi bật cho tổng tiền
    marginTop: 10,
  },
  detailButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderListItem;
