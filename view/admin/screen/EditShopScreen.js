import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { updateShop, getShopById } from '../../../api/adminApi'; // Import API

const EditShopScreen = ({ route, navigation }) => {
  const { shopId } = route.params; // Lấy shopId từ navigation params
  const [shopData, setShopData] = useState({
    name: '',
    address: '',
    status: 'OPEN', // Mặc định là 'OPEN'
  });
  const [loading, setLoading] = useState(false);

  // Lấy thông tin cửa hàng từ API khi mở màn hình
  useEffect(() => {
    const fetchShopDetails = async () => {
      try {
        setLoading(true);  // Đặt trạng thái loading là true trước khi gọi API
        const data = await getShopById(shopId); // Gọi API để lấy thông tin cửa hàng
        setShopData({
          name: data.name,
          address: data.address,
          status: data.status || 'OPEN', // Nếu không có status, mặc định là OPEN
        });
      } catch (error) {
        console.error('Error fetching shop details:', error);
        Alert.alert('Lỗi', 'Không thể lấy thông tin cửa hàng');
      } finally {
        setLoading(false); // Đặt trạng thái loading là false sau khi hoàn thành API
      }
    };

    fetchShopDetails();
  }, [shopId]);

  const handleUpdateShop = async () => {
    setLoading(true); // Bắt đầu quá trình cập nhật
    try {
      const { name, address, status } = shopData;
      const updatedShop = await updateShop(shopId, { name, address, status }); // Gọi API cập nhật cửa hàng
      Alert.alert('Thành công', 'Cửa hàng đã được cập nhật');
      navigation.goBack(); // Quay lại màn hình trước
    } catch (error) {
      console.error('Error updating shop:', error);
      Alert.alert('Lỗi', 'Không thể cập nhật cửa hàng');
    } finally {
      setLoading(false); // Đặt trạng thái loading là false khi quá trình hoàn thành
    }
  };

  const handleInputChange = (field, value) => {
    setShopData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa cửa hàng</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#29B6F6" />
      ) : (
        <>
          <TextInput
            style={styles.input}
            value={shopData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            placeholder="Tên cửa hàng"
          />

          <TextInput
            style={styles.input}
            value={shopData.address}
            onChangeText={(text) => handleInputChange('address', text)}
            placeholder="Địa chỉ cửa hàng"
          />

          <View style={styles.statusContainer}>
            <Text style={styles.statusLabel}>Trạng thái</Text>
            <TouchableOpacity
              style={[styles.statusButton, shopData.status === 'OPEN' && styles.activeStatus]}
              onPress={() => handleInputChange('status', 'OPEN')}
            >
              <Text style={styles.statusText}>OPEN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, shopData.status === 'CLOSE' && styles.activeStatus]}
              onPress={() => handleInputChange('status', 'CLOSE')}
            >
              <Text style={styles.statusText}>CLOSE</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateShop}
            disabled={loading}
          >
            <Text style={styles.updateButtonText}>
              {loading ? 'Đang cập nhật...' : 'Cập nhật cửa hàng'}
            </Text>
          </TouchableOpacity>
        </>
      )}
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
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  activeStatus: {
    backgroundColor: '#29B6F6',
  },
  statusText: {
    color: '#333',
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#66BB6A',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditShopScreen;
