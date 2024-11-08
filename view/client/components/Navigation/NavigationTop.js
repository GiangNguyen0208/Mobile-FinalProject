import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';

const NavigationTop = ({ onSelectOption }) => {
  const navigate = useNavigate();
  
  const navRoutes = [
    { key: 'shipping', title: 'Shipping', path: '/orders/shipping' },
    { key: 'history', title: 'History', path: '/orders/history' },
    { key: 'rating', title: 'Rating', path: '/orders/rating' },
    { key: 'draft', title: 'Draft', path: '/orders/draft' },
  ];

  const handleNavigation = (path, key) => {
    navigate(path);
    onSelectOption(key); // Update the selected option
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <View style={styles.optionsContainer}>
        {navRoutes.map((route) => (
          <TouchableOpacity
            key={route.key}
            onPress={() => handleNavigation(route.path, route.key)}
            style={styles.optionButton}
          >
            <Text style={styles.buttonText}>{route.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#6200EE',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    padding: 8,
  },
  buttonText: {
    color: '#FFFFFF',
  },
});

export default NavigationTop;