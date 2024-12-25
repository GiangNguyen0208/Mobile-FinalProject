import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DropDown from '../../components/DropDown/dropDown';
import Latest from './latest';
import NearMe from './nearMe';

const WishList = () => {
  const [selectedOption, setSelectedOption] = useState('latest');

  const navRoutes = [
    { key: 'latest', title: 'Latest' },
    { key: 'nearMe', title: 'Near Me' },
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case 'latest':
        return <Latest />;
      case 'nearMe':
        return <NearMe />;
      default:
        return <Latest />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Tiêu đề */}
      <Text style={styles.title}>My WishList</Text>

      {/* Thanh điều hướng */}
      <View style={styles.navContainer}>
        {navRoutes.map((route) => (
          <TouchableOpacity
            key={route.key}
            style={[
              styles.navItem,
              selectedOption === route.key && styles.activeNavItem,
            ]}
            onPress={() => setSelectedOption(route.key)}
          >
            <Text
              style={[
                styles.navText,
                selectedOption === route.key && styles.activeNavText,
              ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Dropdown menu */}
      <DropDown />

      {/* Nội dung */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 16,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  activeNavItem: {
    backgroundColor: '#007BFF',
  },
  navText: {
    fontSize: 16,
    color: '#555',
  },
  activeNavText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});

export default WishList;
