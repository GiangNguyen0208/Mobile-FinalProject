import React, { useContext, useState ,useEffect} from 'react';
import { View, Text, Image, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigate } from 'react-router-native';
import { AuthContext, useAuth } from "../../../context/Auth/AuthContext"; // Import AuthContext
import { useFocusEffect } from '@react-navigation/native';
import { getUserProfile ,updateUserProfile} from '../../../../api/userApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
const User = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState({});
  const [lastname, setLastname] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEditing ,setIsEditing] = useState(false);
  const { logout } = useContext(AuthContext);   // Sử dụng useContext để lấy logout từ AuthContext
  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          const userData = await getUserProfile(userId);
          setUser(userData);
          setLastname(userData.lastname);
          setAddress(userData.address);
          setAvatar(userData.avatar);
          setEmail(userData.email);
          setPhone(userData.phone);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchUser();
    }, [userId])
  );

  // Hàm xử lý khi nhấn nút "Save"
      const handleSave = async () => {
          const updatedUser = {
              ...user, // Giữ nguyên các trường khác
              lastname,    // Lấy từ state `name`
              address, // Lấy từ state `address`
              avatar,
              email, 
              phone,  // Lấy từ state `image`
          };
          const response = await updateUserProfile(user.id, updatedUser);
          if (response.status === 200) {
              alert('Cập nhật thành công!');
              setUser(updatedUser); 
              setLastname(updatedUser.lastname);
              setAddress(updatedUser.address);
              setPhone(updatedUser.phone);
              setEmail(updatedUser.email);
              setAvatar(updatedUser.avatar);
              setIsEditing(false);
          } else {
              alert('Cập nhật  thất bại!');
              setIsEditing(false);
          }
      };

  

  const handleLogout = async () => {
    try {
      await logout();
      await AsyncStorage.removeItem("token");

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
        <Image source={{ uri: 'https://i.pinimg.com/736x/97/bb/06/97bb067e30ff6b89f4fbb7b9141025ca.jpg' }} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Họ tên:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={lastname}
            onChangeText={setLastname}
          />
        ) : (
          <Text style={styles.value}>{lastname}</Text>
        )}
      </View>
    
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        ) : (
          <Text style={styles.value}>{email}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Địa chỉ:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />
        ) : (
          <Text style={styles.value}>{address}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Số ĐT:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={phone}
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
        ) : (
          <Text style={styles.value}>{phone}</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>URL Avatar:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={avatar}
            onChangeText={setAvatar}
          />
        ) : (
          <Text style={styles.value}>{avatar}</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <Button title="Lưu thông tin" onPress={()=>handleSave()} />
        ) : (
          <Button title="Chỉnh sửa thông tin" onPress={()=>setIsEditing(true)} />
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
    flexWrap:'wrap'
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
