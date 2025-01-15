// news.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getListNotification } from '../../../../api/userApi'; // Đường dẫn tới file API của bạn
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const News = () => {
  const navigation = useNavigation(); // Điều hướng sử dụng từ react-navigation
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const title = "Thông báo mới"; // Giá trị title là "Thông báo mới"

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getListNotification();
        setNotifications(data.result); // Assuming `result` contains the list of notifications
        setLoading(false);
        console.log(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.shopName}>{item.shopName}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header section */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={<Text style={styles.titleHeader}>{title}</Text>} />
      </Appbar.Header>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    padding: 20,
  },
  list: {
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 8,
    borderLeftColor: '#e74c3c',  // Màu đỏ nổi bật
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  shopName: {
    fontSize: 18,
    color: '#34495E',
    marginTop: 6,
  },
  message: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 12,
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',  // Màu đỏ cho lỗi
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent', // Xóa màu nền của header
    paddingVertical: 5, // Giảm khoảng cách phía trên
    paddingHorizontal: 15,
    marginTop: 0, // Đưa phần header lên sát trên
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9', // Màu xanh dương cho tiêu đề
    marginLeft: 10,
  },
});

export default News;
