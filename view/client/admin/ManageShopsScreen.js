import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const shops = [
  { id: '1', name: 'Shop A', location: 'Hanoi' },
  { id: '2', name: 'Shop B', location: 'HCM' },
  { id: '3', name: 'Shop C', location: 'Da Nang' },
];

const ManageShopsScreen = () => {
  const [shopList, setShopList] = useState(shops);
  const navigation = useNavigation(); // Hook để điều hướng

  const handleDelete = (shopId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa cửa hàng này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => deleteShop(shopId) },
      ]
    );
  };

  const deleteShop = (shopId) => {
    setShopList(shopList.filter(shop => shop.id !== shopId));
  };

  const handleEdit = (shopId) => {
    Alert.alert('Chỉnh sửa cửa hàng', `Chỉnh sửa thông tin của cửa hàng ID: ${shopId}`);
  };

  const handleManage = (shop) => {
    navigation.navigate('ManageShopProducts', { shopName: shop.name });
  };

  const handleAddShop = () => {
    const newShop = { id: (shopList.length + 1).toString(), name: `Shop ${String.fromCharCode(65 + shopList.length)}`, location: 'Địa điểm mới' };
    setShopList([...shopList, newShop]);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth * 0.9 }]}>
      <Text style={styles.title}>Quản lý Cửa hàng</Text>

      <FlatList
        data={shopList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.shopItem}>
            <View>
              <Text style={styles.shopName}>{item.name}</Text>
              <Text style={styles.shopLocation}>{item.location}</Text>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => handleEdit(item.id)}>
                <Text style={styles.buttonText}>Chỉnh sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.manageButton]} onPress={() => handleManage(item)}>
                <Text style={styles.buttonText}>Quản lý</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
                <Text style={styles.buttonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddShop}>
        <Text style={styles.addButtonText}>Thêm cửa hàng mới</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    alignSelf: 'center',
    paddingLeft : 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  shopItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  shopLocation: {
    fontSize: 14,
    color: '#666',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#FFA726',
  },
  manageButton: {
    backgroundColor: '#29B6F6',
  },
  deleteButton: {
    backgroundColor: '#EF5350',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: '#66BB6A',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageShopsScreen;
