import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import OrderItems from '../../pages/order/orderItem';

const History = ({ orderItems }) => {
  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default History;