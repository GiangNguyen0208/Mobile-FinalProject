import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Image, Alert } from 'react-native';

const AdminNavigation = ({ onMenuSelect, currentPage }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerWidth = new Animated.Value(0); // Width of the drawer
  const screenWidth = Dimensions.get('window').width;
  const maxDrawerWidth = screenWidth * 0.25; // 25% of screen width

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công!');
  };

  // Hàm bật/tắt drawer
  const toggleDrawer = () => {
    if (isDrawerOpen) {
      Animated.timing(drawerWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDrawerOpen(false));
    } else {
      Animated.timing(drawerWidth, {
        toValue: maxDrawerWidth,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDrawerOpen(true));
    }
  };

  // Hàm chọn mục menu và đóng drawer
  const handleMenuSelect = (page) => {
    onMenuSelect(page); // Gọi hàm trên props
    toggleDrawer(); // Đóng drawer ngay sau khi chọn mục
  };

  return (
    <View style={styles.container}>
      {/* Nút mở/đóng Drawer */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
        <Text style={styles.menuButtonText}>≡</Text>
      </TouchableOpacity>

      {/* Drawer */}
      <Animated.View style={[styles.drawer, { width: drawerWidth }]}>
        <View style={styles.menuItemsContainer}>
          <TouchableOpacity
              onPress={() => handleMenuSelect('Cài đặt')}
              style={styles.drawerItem}>
            <Text style={[styles.drawerItemText, currentPage === 'Cài đặt' && styles.selectedMenuItem]}>
              Hồ sơ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMenuSelect('Quản lý shop')}
            style={styles.drawerItem}>
            <Text style={[styles.drawerItemText, currentPage === 'Quản lý shop' && styles.selectedMenuItem]}>
              Quản lý shop
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMenuSelect('Quản lý user')}
            style={styles.drawerItem}>
            <Text style={[styles.drawerItemText, currentPage === 'Quản lý user' && styles.selectedMenuItem]}>
              Quản lý user
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMenuSelect('Thống kê')}
            style={styles.drawerItem}>
            <Text style={[styles.drawerItemText, currentPage === 'Thống kê' && styles.selectedMenuItem]}>
              Thống kê
            </Text>
          </TouchableOpacity>
        </View>
        {/* Admin Info */}
        {isDrawerOpen && (
          <View style={styles.adminInfo}>
            <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
            <Text style={styles.adminName}>Admin Name</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 100 },
  menuButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
    zIndex: 200,
  },
  menuButtonText: { fontSize: 30, color: 'black' },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#f0f0f0',
    padding: 20,
    justifyContent: 'flex-start',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  menuItemsContainer: { flex: 1, justifyContent: 'center' },
  drawerItem: { marginVertical: 10 },
  drawerItemText: { fontSize: 18, color: '#000', opacity: 0.5 },
  selectedMenuItem: { fontWeight: 'bold', opacity: 1 },
  adminInfo: { position: 'absolute', bottom: 20, left: 20, alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  adminName: { marginTop: 10, fontSize: 18, fontWeight: 'bold' },
  logoutButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default AdminNavigation;
