import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bill Gates', email: 'bill@example.com' },
];

const ManageUsersScreen = () => {
  const [userList, setUserList] = useState(users);

  const handleDelete = (userId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa người dùng này?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteUser(userId) },
      ]
    );
  };

  const deleteUser = (userId) => {
    setUserList(userList.filter(user => user.id !== userId));
  };

  const handleEdit = (userId) => {
    Alert.alert('Chỉnh sửa người dùng', `Chỉnh sửa thông tin của người dùng ID: ${userId}`);
    // Thực hiện logic chỉnh sửa ở đây, có thể dùng một modal để chỉnh sửa
  };

  // Hàm để thêm người dùng mới
  const handleAddUser = () => {
    Alert.alert(
      'Thêm người dùng',
      'Nhập thông tin người dùng mới',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => addUser() },
      ]
    );
  };

  // Hàm thêm người dùng mới vào danh sách
  const addUser = () => {
    const newUser = { id: (userList.length + 1).toString(), name: 'New User', email: 'newuser@example.com' };
    setUserList([...userList, newUser]);
  };

  // Lấy chiều rộng màn hình và tính toán 80% chiều rộng
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.8; // 80% of screen width

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Text style={styles.title}>Quản lý User</Text>
      <FlatList
        data={userList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text>{item.email}</Text>
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

      {/* Button to add new user */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Text style={styles.addButtonText}>Thêm người dùng</Text>
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
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  userName: {
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

export default ManageUsersScreen;
