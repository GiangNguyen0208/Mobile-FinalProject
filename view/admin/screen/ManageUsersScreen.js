import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { getAllUser, addUser, updateUser, deleteUser } from '../../../api/adminApi'; // Cập nhật đường dẫn import API

const ManageUsersScreen = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách người dùng từ API
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const data = await getAllUser(); // Gọi API getAllUser
        setUserList(data.result); // Cập nhật state với dữ liệu nhận được
      } catch (error) {
        console.error('Error fetching users:', error);
        Alert.alert('Lỗi', 'Không thể tải danh sách người dùng ,............');

      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleDelete = (userId) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa người dùng này?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteUserById(userId) },
      ]
    );
  };

  const deleteUserById = async (userId) => {
    try {
      await deleteUser(userId); // Gọi API xóa người dùng
      setUserList(userList.filter(user => user.id !== userId)); // Cập nhật lại danh sách sau khi xóa
      Alert.alert('Thành công', 'Người dùng đã được xóa.');
    } catch (error) {
      console.error('Error deleting user:', error);
      Alert.alert('Lỗi', 'Không thể xóa người dùng');
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = userList.find(user => user.id === userId);
    if (userToEdit) {
      // Chỉnh sửa người dùng: Bạn có thể sử dụng một modal hoặc form để chỉnh sửa dữ liệu
      Alert.prompt(
        'Chỉnh sửa người dùng',
        'Chỉnh sửa thông tin người dùng',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async (newName) => {
              const updatedUser = { ...userToEdit, name: newName }; // Giả sử bạn muốn chỉnh sửa tên người dùng
              try {
                await updateUser(updatedUser.id, updatedUser); // Gọi API cập nhật người dùng
                const updatedList = userList.map(user =>
                  user.id === userId ? updatedUser : user
                );
                setUserList(updatedList); // Cập nhật danh sách người dùng với thông tin mới
                Alert.alert('Thành công', 'Thông tin người dùng đã được cập nhật.');
              } catch (error) {
                console.error('Error updating user:', error);
                Alert.alert('Lỗi', 'Không thể cập nhật thông tin người dùng');
              }
            },
          },
        ],
        'plain-text', // Chế độ nhập liệu (chỉ nhập văn bản)
        userToEdit.name // Giá trị mặc định của người dùng (dữ liệu hiện tại)
      );
    }
  };

  const handleAddUser = () => {
    Alert.alert(
      'Thêm người dùng',
      'Nhập thông tin người dùng mới',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => addNewUser() },
      ]
    );
  };

  const addNewUser = async () => {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      // Thêm các trường dữ liệu cần thiết cho userCreationReq
    };
    try {
      await addUser(newUser); // Gọi API thêm người dùng
      const data = await getAllUser(); // Lấy lại danh sách sau khi thêm
      setUserList(data.result);
      Alert.alert('Thành công', 'Người dùng đã được thêm.');
    } catch (error) {
      console.error('Error adding user:', error);
      Alert.alert('Lỗi', 'Không thể thêm người dùng');
    }
  };

  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.8;

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Text style={styles.title}>Quản lý User</Text>
      <FlatList
        data={userList}
        keyExtractor={item => item.id.toString()}
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
    alignSelf: 'center',
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
