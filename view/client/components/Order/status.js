import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Status = ({ selectedOption }) => {
  const getStatusMessage = () => {
    switch (selectedOption) {
      case 'shipping':
        return 'Your order is being shipped.';
      case 'history':
        return 'Here is your order history.';
      case 'rating':
        return 'Rate your experience with us.';
      case 'draft':
        return 'These are your draft orders.';
      default:
        return 'Select an option to see the status.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.statusText}>{getStatusMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    margin: 16,
  },
  statusText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Status;