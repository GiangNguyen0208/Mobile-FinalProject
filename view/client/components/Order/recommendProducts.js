import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import List from '../ListItem/ListVertical';

const RecommendedProducts = () => {
  const products = [
    { id: '1', name: 'Product A' },
    { id: '2', name: 'Product B' },
    { id: '3', name: 'Product C' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Products</Text>
      <List 
        items={products.map(product => ({
          id: product.id,
          image: null, 
          title: product.name,
          description: '',
          date: '',
        }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default RecommendedProducts;