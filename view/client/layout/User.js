import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const User = () => {
  // Khởi tạo thông tin người dùng
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyen Van A',
    age: 28,
    email: 'nguyenvana@example.com',
    address: '123 Đường ABC, Thành phố XYZ'
  });

  // Hàm xử lý khi nhấn vào nút chỉnh sửa thông tin
  const handleEditPress = () => {
    Alert.alert('Thông báo', 'Chức năng chỉnh sửa thông tin sẽ sớm ra mắt!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Họ tên:</Text>
        <Text style={styles.value}>{userInfo.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tuổi:</Text>
        <Text style={styles.value}>{userInfo.age}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userInfo.email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Địa chỉ:</Text>
        <Text style={styles.value}>{userInfo.address}</Text>
      </View>
      <Button title="Chỉnh sửa thông tin" onPress={handleEditPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 100,
  },
  value: {
    fontSize: 18,
    flex: 1,
  },
});

export default User;
