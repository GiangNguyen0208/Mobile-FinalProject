import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions, Image } from 'react-native';

// Giả sử các màn hình con
import ManageShopsScreen from './ManageShopsScreen';
import ManageUsersScreen from './ManageUsersScreen';
import StatisticScreen from './StatisticsScreen';

export default function AdminScreen() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const drawerWidth = new Animated.Value(0);  // Width of the drawer (starts at 0)
  const screenWidth = Dimensions.get('window').width;
  const maxDrawerWidth = screenWidth * 0.25; // 25% of screen width

  // Toggle drawer
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

  // Handle menu item click - Update current page and close drawer
  const handleMenuItemClick = (item) => {
    setCurrentPage(item);  // Set the current page
    setIsDrawerOpen(false); // Close the drawer immediately after selecting a menu item
  };

  // Render nội dung chính tùy theo trang hiện tại
  const renderMainContent = () => {
    return currentPage === 'Quản lý shop'
      ? <ManageShopsScreen />
      : currentPage === 'Quản lý user'
      ? <ManageUsersScreen />
      : currentPage === 'Thống kê'
      ? <StatisticScreen />
      : <Text style={styles.mainText}>Admin Screen Content</Text>; // Nếu không có trang nào, hiển thị mặc định
  };

  // Automatically close the drawer when `isDrawerOpen` changes
  useEffect(() => {
    if (!isDrawerOpen) {
      Animated.timing(drawerWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(drawerWidth, {
        toValue: maxDrawerWidth,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isDrawerOpen]);

  return (
    <View style={styles.container}>
      {/* Button to open drawer */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
        <Text style={styles.menuButtonText}>≡</Text>
      </TouchableOpacity>

      {/* Drawer Menu */}
      <Animated.View style={[styles.drawer, { width: drawerWidth }]}>
        {/* Menu Items */}
        <View style={styles.menuItemsContainer}>
          <TouchableOpacity
            onPress={() => handleMenuItemClick('Quản lý shop')}
            style={styles.drawerItem}>
            <Text style={[styles.drawerItemText, currentPage === 'Quản lý shop' && styles.selectedMenuItem]}>
              Quản lý shop
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMenuItemClick('Quản lý user')}
            style={styles.drawerItem}>
            <Text style={[styles.drawerItemText, currentPage === 'Quản lý user' && styles.selectedMenuItem]}>
              Quản lý user
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleMenuItemClick('Thống kê')}
            style={styles.drawerItem}>
            <Text style={[styles.drawerItemText, currentPage === 'Thống kê' && styles.selectedMenuItem]}>
              Thống kê
            </Text>
          </TouchableOpacity>
        </View>

        {/* Admin Info - hiển thị ở góc dưới */}
        {isDrawerOpen && (
          <View style={styles.adminInfo}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.avatar}
            />
            <Text style={styles.adminName}>Admin Name</Text>
          </View>
        )}
      </Animated.View>

      {/* Main Content */}
      <View style={[styles.mainContent, { marginLeft: isDrawerOpen ? maxDrawerWidth : 0 }]}>
        {renderMainContent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 100,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  menuButtonText: {
    fontSize: 30,
    color: 'black',
  },
  adminInfo: {
    position: 'absolute', // Set position to absolute to position it at the bottom
    bottom: 20, // Position it 20 units from the bottom of the drawer
    left: 20, // Add left margin to position it inside the drawer
    alignItems: 'center',
    paddingBottom: 20, // Add bottom padding to ensure some space
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  adminName: {
    marginTop: 10, // Add some spacing between image and name
    fontSize: 18,
    fontWeight: 'bold',
  },
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
  menuItemsContainer: {
    flex: 1, // Take up all available space
    justifyContent: 'center', // Center the menu items vertically
  },
  drawerItem: {
    marginVertical: 10,
  },
  drawerItemText: {
    fontSize: 18,
    color: '#000',
    opacity: 0.5, // Giảm độ sáng cho các mục chưa chọn
  },
  selectedMenuItem: {
    fontWeight: 'bold',  // Tô đậm mục được chọn
    opacity: 1,  // Đảm bảo mục được chọn không bị mờ
  },
  mainContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 0,
    paddingHorizontal: 20,
    paddingTop: 120, // Dịch xuống dưới phần header
  },
  mainText: {
    fontSize: 24,
  },
});
