import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import OrderListItem from './OrderListItem'; 
import { useNavigation } from '@react-navigation/native';

const History = ({ items }) => {
  const navigation = useNavigation();

  const handleViewDetail = (orderId) => {
    navigation.navigate('DetailOrderUser', { orderId });
  };
  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>Orders History</Text>
      {/* Danh sách đơn hàng */}
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <OrderListItem
            item={item}
            onDetailPress={handleViewDetail}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No orders found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Màu nền nhẹ nhàng
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default History;
