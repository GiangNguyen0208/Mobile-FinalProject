import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AdminNavigation from './AdminNavigation';
import ManageShopsScreen from './ManageShopsScreen';
import ManageUsersScreen from './ManageUsersScreen';
import StatisticScreen from './StatisticsScreen';
import AdminProfile from "./AdminProfile";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminScreen() {
  const [currentPage, setCurrentPage] = useState('');

  // Render nội dung chính theo trang hiện tại
  const renderMainContent = () => {
    switch (currentPage) {
      case '`Cài đặt`':
        return <AdminProfile/>
      case 'Quản lý shop':
        return <ManageShopsScreen />;
      case 'Quản lý user':
        return <ManageUsersScreen />;
      case 'Thống kê':
        return <StatisticScreen />;

      default:
        return <AdminProfile/>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sử dụng AdminNavigation */}
      <AdminNavigation onMenuSelect={setCurrentPage} currentPage={currentPage} />
      <View style={styles.mainContent}>
        {renderMainContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mainContent: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  defaultContent: { fontSize: 20, color: 'gray', textAlign: 'center' },
});
