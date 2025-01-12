import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllShops, addShop, updateShop, deleteShop } from '../../../api/adminApi'; // Import API

const ManageShopsScreen = () => {
  const [shopList, setShopList] = useState([]);
  const navigation = useNavigation(); // Hook để điều hướng
  const [loading, setLoading] = useState(false);

  // Lấy danh sách cửa hàng từ API
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const data = await getAllShops(); // Gọi API lấy tất cả cửa hàng
        setShopList(data.result); // Cập nhật danh sách cửa hàng
      } catch (error) {
        console.error('Error fetching shops:', error);
        Alert.alert('Lỗi', 'Không thể tải danh sách cửa hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

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
      setShopList(shopList.filter(shop => shop.id !== shopId)); // Cập nhật lại danh sách cửa hàng
      Alert.alert('Thành công', 'Cửa hàng đã được xóa.');
    } catch (error) {
      console.error('Error deleting shop:', error);
      Alert.alert('Lỗi', 'Không thể xóa cửa hàng');
    }
  };

    const handleEdit = (shopId) => {
      // Chuyển hướng tới trang chỉnh sửa cửa hàng, truyền shopId
    navigation.navigate('EditShop', { shopId: shopId }); // Điều hướng tới màn hình EditShop
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
      setShopList([...shopList, addedShop]); // Thêm cửa hàng mới vào danh sách
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
           <View style={styles.shopItem}>
             <View>
               <Text style={styles.shopName}>{item.name}</Text>
               <Text style={styles.shopLocation}>{item.location}</Text>
             </View>

             {/* Group buttons below the shop name */}
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
    flexDirection: 'column', // Sắp xếp các phần tử theo chiều dọc
    justifyContent: 'flex-start',
    alignItems: 'flex-start', // Đảm bảo các phần tử không bị lệch
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
    marginBottom: 5, // Khoảng cách giữa tên cửa hàng và địa chỉ
  },
  shopLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10, // Khoảng cách giữa địa chỉ và các nút
  },
  buttonGroup: {
    flexDirection: 'row', // Sắp xếp các nút theo chiều ngang
    justifyContent: 'space-between', // Đảm bảo các nút cách đều
    width: '100%', // Chiếm hết chiều rộng
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '30%', // Các nút chiếm 1/3 chiều rộng của mỗi hàng
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
    textAlign: 'center', // Đảm bảo chữ nằm giữa
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
