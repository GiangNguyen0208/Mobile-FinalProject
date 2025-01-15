import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getListVoucher } from '../../../../api/userApi'; // Đường dẫn tới file API của bạn
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Promotion = () => {
  const navigation = useNavigation(); // Điều hướng sử dụng từ react-navigation
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const title = "Danh sách Mã giảm / Khuyến mãi"; // Giá trị title sẽ được truyền vào Text

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await getListVoucher();
        setVouchers(data.result); // Assuming `result` contains the list of vouchers
        setLoading(false);
        console.log(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVouchers();
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

  const renderVoucher = ({ item }) => (
    <View style={styles.voucherItem}>
      <Text style={styles.code}>Code: {item.code}</Text>
      <Text style={styles.priceMin}>Min Price: ${item.priceMin}</Text>
      <Text style={styles.valueDiscount}>Discount: {item.valueDiscount}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header section */}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={<Text style={styles.title}>{title}</Text>} />
      </Appbar.Header>

      <FlatList
        data={vouchers}
        renderItem={renderVoucher}
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
  voucherItem: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 8,
    borderLeftColor: '#3498db', // Màu xanh dương nổi bật
  },
  code: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2980b9', // Màu xanh dương cho code
  },
  priceMin: {
    fontSize: 18,
    color: '#34495E',
    marginTop: 6,
  },
  valueDiscount: {
    fontSize: 18,
    color: '#E74C3C', // Màu đỏ cho phần giảm giá
    marginTop: 6,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#E74C3C',
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9', // Màu xanh dương cho tiêu đề
    marginLeft: 10, // Đẩy tiêu đề ra một chút để không bị dính vào nút quay lại
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent', // Xóa màu nền của header
    paddingVertical: 5, // Giảm khoảng cách phía trên
    paddingHorizontal: 15,
    marginTop: 0, // Đưa phần header lên sát trên
  },
});

export default Promotion;
