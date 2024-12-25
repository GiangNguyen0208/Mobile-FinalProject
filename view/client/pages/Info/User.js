import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const User = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Nguyen Van A',
    age: '28',
    email: 'nguyenvana@example.com',
    address: '123 Đường ABC, Thành phố XYZ',
    phoneNumber: '037147258',
    rank: 'Vàng',
    avatar: require('../../../../assets/test1.png')
  });

  const [isEditing, setIsEditing] = useState(false);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 50,
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
    marginTop: 20,
  },
});

export default User;