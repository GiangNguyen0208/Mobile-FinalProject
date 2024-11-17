import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Sử dụng FontAwesome từ Expo

const User = () => {
  // Khởi tạo thông tin người dùng
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyen Van A',
    age: '28',
    email: 'nguyenvana@example.com',
    address: '123 Đường ABC, Thành phố XYZ',
    phoneNumber: '037147258',
    rank: 'Vàng',
    avatar: require('../../../../assets/test1.png')
  });

  // Trạng thái để biết người dùng có đang ở chế độ chỉnh sửa hay không
  const [isEditing, setIsEditing] = useState(false);

  // Hàm cập nhật thông tin khi người dùng chỉnh sửa
  const handleChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value }); // Cập nhật lại thông tin người dùng
  };

  // Hàm xử lý khi nhấn vào nút "Chỉnh sửa"
  const handleEditPress = () => {
    setIsEditing(true); // Chuyển sang chế độ chỉnh sửa
  };

  // Hàm xử lý khi nhấn vào nút "Lưu"
  const handleSavePress = () => {
    setIsEditing(false); // Trở về chế độ chỉ xem sau khi lưu
    Alert.alert('Thông báo', 'Thông tin của bạn đã được cập nhật!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>
      {/* Hiển thị avatar */}
      <View style={styles.avatarContainer}>
        <Image source={userInfo.avatar} style={styles.avatar} />
      </View>
      {/* Họ tên */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Họ tên:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userInfo.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        ) : (
          <Text style={styles.value}>{userInfo.name}</Text>
        )}
      </View>

      {/* Tuổi */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tuổi:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userInfo.age}
            keyboardType="numeric"
            onChangeText={(text) => handleChange('age', text)}
          />
        ) : (
          <Text style={styles.value}>{userInfo.age}</Text>
        )}
      </View>

      {/* Email */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userInfo.email}
            keyboardType="email-address"
            onChangeText={(text) => handleChange('email', text)}
          />
        ) : (
          <Text style={styles.value}>{userInfo.email}</Text>
        )}
      </View>

      {/* Địa chỉ */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Địa chỉ:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userInfo.address}
            onChangeText={(text) => handleChange('address', text)}
          />
        ) : (
          <Text style={styles.value}>{userInfo.address}</Text>
        )}
      </View>

      {/* Số điện thoại */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Số ĐT:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userInfo.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange('phoneNumber', text)}
          />
        ) : (
          <Text style={styles.value}>{userInfo.phoneNumber}</Text>
        )}
      </View>

      {/* Hạng - Chỉ đọc */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Hạng:</Text>
        <Text style={styles.rankValue}>
          {userInfo.rank}
          {'  '}
          {userInfo.rank === 'Bạc' && <FontAwesome name="star" size={20} color="silver" />}
          {userInfo.rank === 'Vàng' && <FontAwesome name="star" size={20} color="gold" />}
          {userInfo.rank === 'Kim Cương' && <FontAwesome name="star" size={20} color="blue" />}
        </Text>
      </View>

      {/* Nút "Chỉnh sửa" hoặc "Lưu" nằm ở dưới cùng */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <Button title="Lưu thông tin" onPress={handleSavePress} />
        ) : (
          <Button title="Chỉnh sửa thông tin" onPress={handleEditPress} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between', // Thêm để đẩy nút xuống dưới
  },
  avatarContainer: {
    alignItems: 'center', // Căn giữa
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // Để tạo hình tròn
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
    alignItems: 'center',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    fontSize: 18,
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  rankValue: {
    fontSize: 18,
    flex: 1,
    textAlign: 'left',
    paddingVertical: 8,
  },
  buttonContainer: {
    marginTop: 20, // Thêm khoảng cách nếu cần
  },
});

export default User;
