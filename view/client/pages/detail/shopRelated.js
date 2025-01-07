import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RelatedShopScreen = ({itemId}) => {
  return (
    <View style={styles.relatedContainer}>
      <Text style={styles.relatedTitle}>Cửa Hàng Liên Quan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  relatedContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});


export default RelatedShopScreen;