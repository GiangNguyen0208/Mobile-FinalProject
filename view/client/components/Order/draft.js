import React from 'react';
import { View, StyleSheet } from 'react-native';
import OrderList from './orderList';

const Draft = ({ items }) => {
  return (
    <View style={styles.container}>
      <OrderList items={items} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Draft;