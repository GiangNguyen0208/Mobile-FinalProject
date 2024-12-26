import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

const shops = [
  { id: '1', name: 'Shop A', location: 'Hanoi' },
  { id: '2', name: 'Shop B', location: 'HCM' },
  { id: '3', name: 'Shop C', location: 'Da Nang' },
];

const ManageShopsScreen = () => {
  const [shopList, setShopList] = useState(shops);

  const handleDelete = (shopId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa cửa hàng này?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteShop(shopId) },
      ]
    );
  };

  const deleteShop = (shopId) => {
    setShopList(shopList.filter(shop => shop.id !== shopId));
  };

  const handleEdit = (shopId) => {
    Alert.alert('Chỉnh sửa cửa hàng', `Chỉnh sửa thông tin của cửa hàng ID: ${shopId}`);
    // Thực hiện logic chỉnh sửa ở đây, có thể dùng một modal để chỉnh sửa
  };

  // Hàm để thêm cửa hàng mới
  const handleAddShop = () => {
    Alert.alert(
      'Thêm cửa hàng',
      'Nhập thông tin cửa hàng mới',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => addShop() },
      ]
    );
  };

  // Hàm thêm cửa hàng mới vào danh sách
  const addShop = () => {
    const newShop = { id: (shopList.length + 1).toString(), name: 'Shop D', location: 'Nha Trang' };
    setShopList([...shopList, newShop]);
  };

  // Lấy chiều rộng màn hình và tính toán 80% chiều rộng
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.8; // 80% of screen width

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Text style={styles.title}>Quản lý Shop</Text>
      <FlatList
        data={shopList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.shopItem}>
            <Text style={styles.shopName}>{item.name}</Text>
            <Text>{item.location}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleEdit(item.id)}>
                <Button title="Chỉnh sửa" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Button title="Xóa" color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Button to add new shop */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddShop}>
        <Text style={styles.addButtonText}>Thêm cửa hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: 'center', // Center the container horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  shopItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  shopName: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageShopsScreen;
