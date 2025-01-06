import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigate } from 'react-router-native';
import { AuthContext } from "../../../context/Auth/AuthContext"; // Import AuthContext

const User = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyen Van A',
    age: '28',
    email: 'nguyenvana@example.com',
    address: '123 Đường ABC, Thành phố XYZ',
    phoneNumber: '037147258',
    rank: 'Vàng',
    avatar: require('../../../../assets/test1.png'),
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Sử dụng useContext để lấy logout từ AuthContext

  const handleChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    setIsEditing(false);
    Alert.alert('Thông báo', 'Thông tin của bạn đã được cập nhật!');
  };

  const handleLogout = async () => {
    try {
      await logout();
      await AsyncStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsPrivate(true);
      setRole(null);
      navigate('/login');
      Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công!');
    } catch (error) {
      console.error("Logout Failed!", error);
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>
      <View style={styles.avatarContainer}>
        <Image source={userInfo.avatar} style={styles.avatar} />
      </View>
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
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <Button title="Lưu thông tin" onPress={handleSavePress} />
        ) : (
          <Button title="Chỉnh sửa thông tin" onPress={handleEditPress} />
        )}
      </View>
      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button title="Đăng xuất" onPress={handleLogout} color="#f44336" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 30,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    width: 120,
    color: '#555',
  },
  value: {
    fontSize: 18,
    flex: 1,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 18,
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  rankValue: {
    fontSize: 18,
    flex: 1,
    textAlign: 'left',
    paddingVertical: 8,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 25,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#007BFF',
    overflow: 'hidden',
  },
  logoutButtonContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#f44336',
    overflow: 'hidden',
  },
});

export default User;
