import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderList = ({ items }) => {
  return (
    <View style={styles.container}>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <Text key={index} style={styles.text}>{item}</Text> 
        ))
      ) : (
        <Text style={styles.noContentText}>No Content!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  noContentText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default OrderList;