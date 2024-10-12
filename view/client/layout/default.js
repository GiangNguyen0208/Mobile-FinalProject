import React from 'react';
import { View, Button } from 'react-native'; // Import thêm Button
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import SearchBox from '../components/search';
import styles from '../../../public/client/stylesheet/default.style';

const Default = ({ children }) => {
  const navigation = useNavigation(); // Khởi tạo hook navigation

  return (
    <>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Đặt Đồ Ăn" />
        </Appbar.Header>
        <View style={styles.searchContainer}>
          <SearchBox placeholder="Tìm kiếm món ăn..." />
        </View>
        <View style={styles.content}>
          {children}
        </View>
        {/* Thêm nút để chuyển đến trang DonHang */}
        <Button
          title="Đến Đơn Hàng"
          onPress={() => navigation.navigate('DonHang')}
        />
      </View>
    </>
  );
};

export default Default;
