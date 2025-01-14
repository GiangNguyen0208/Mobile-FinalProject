import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllShops, getAllShopsClosed, addShop, deleteShop } from '../../../api/adminApi'; // Import API

const ManageShopsScreen = () => {
  const [shopList, setShopList] = useState([]);
  const navigation = useNavigation(); // Hook để điều hướng
  const [loading, setLoading] = useState(false);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const activeShops = await getAllShops(); // Lấy danh sách cửa hàng đang hoạt động
      const closedShops = await getAllShopsClosed(); // Lấy danh sách cửa hàng đã đóng

      // Gắn cờ cho từng loại shop
      const combinedList = [
        ...activeShops.result.map((shop) => ({ ...shop, closed: false })),
        ...closedShops.result.map((shop) => ({ ...shop, closed: true })),
      ];

      setShopList(combinedList);
    } catch (error) {
      console.error('Error fetching shops:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách cửa hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchShops(); // Gọi lại fetchShops khi màn hình được focus lại
    });

    fetchShops(); // Lấy dữ liệu ngay khi màn hình load lần đầu tiên

    return unsubscribe;
  }, [navigation]);

  const handleDelete = (shopId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa cửa hàng này?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Xóa', style: 'destructive', onPress: () => deleteShopById(shopId) },
      ]
    );
  };

  const deleteShopById = async (shopId) => {
    try {
      await deleteShop(shopId); // Gọi API xóa cửa hàng
      setShopList(shopList.filter((shop) => shop.id !== shopId)); // Cập nhật danh sách cửa hàng
      Alert.alert('Thành công', 'Cửa hàng đã được xóa.');
    } catch (error) {
      console.error('Error deleting shop:', error);
      Alert.alert('Lỗi', 'Không thể xóa cửa hàng');
    }
  };

  const handleEdit = (shopId) => {
    navigation.navigate('EditShop', { shopId }); // Điều hướng tới màn hình chỉnh sửa
  };

  const handleManage = (shop) => {
    navigation.navigate('ManageShopProducts', { shopName: shop.name });
  };

  const handleAddShop = async () => {
    const newShop = {
      name: `Shop ${String.fromCharCode(65 + shopList.length)}`,
      location: 'Địa điểm mới',
    };
    try {
      const addedShop = await addShop(newShop); // Gọi API thêm cửa hàng
      setShopList([...shopList, { ...addedShop, closed: false }]); // Thêm vào danh sách
      Alert.alert('Thành công', 'Cửa hàng đã được thêm.');
    } catch (error) {
      console.error('Error adding shop:', error);
      Alert.alert('Lỗi', 'Không thể thêm cửa hàng');
    }
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth * 0.9 }]}>
      <Text style={styles.title}>Quản lý Cửa hàng</Text>

      {loading ? (
        <Text>Đang tải dữ liệu...</Text>
      ) : (
        <FlatList
          data={shopList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.shopItem, item.closed && styles.closedShop]}>
              <View>
                <Text style={styles.shopName}>{item.name}</Text>
                <Text style={styles.shopLocation}>{item.location}</Text>
              </View>

              <View style={styles.buttonGroup}>
                {/* Nút Chỉnh sửa luôn hiển thị và không bị làm mờ */}
                <TouchableOpacity
                  style={[styles.button, styles.editButton, item.closed && styles.activeEditButton]}
                  onPress={() => handleEdit(item.id)}
                >
                  <Text style={styles.buttonText}>Chỉnh sửa</Text>
                </TouchableOpacity>

                {/* Các nút khác chỉ hiển thị khi cửa hàng mở */}
                {!item.closed && (
                  <>
                    <TouchableOpacity style={[styles.button, styles.manageButton]} onPress={() => handleManage(item)}>
                      <Text style={styles.buttonText}>Quản lý</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
                      <Text style={styles.buttonText}>Xóa</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}
        />
      )}

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
    paddingLeft: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  shopItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  closedShop: {
    opacity: 0.5, // Làm mờ các cửa hàng đã đóng
  },
  activeEditButton: {
    opacity: 1.5, // Giữ nút chỉnh sửa không bị làm mờ khi cửa hàng đóng
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  shopLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '30%',
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
    textAlign: 'center',
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
