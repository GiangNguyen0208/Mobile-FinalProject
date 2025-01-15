import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import StartRender from './../../components/Rating/StartRender';

const ItemRelated = ({ item, onPress }) => {
  if (!item) {
    return <Text style={styles.errorText}>Không có dữ liệu</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Card container */}
      <View style={styles.card}>
        {/* Image Row */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.imageLink?.[0] || '' }} style={styles.image} />
        </View>

        {/* Text Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription}>{item.des}</Text>
          <StartRender rating={item.rating} />
          <Text style={styles.productPrice}>{`₫${item.price.toFixed(2)}`}</Text>
        </View>

        {/* Additional images */}
        <View style={styles.additionalImages}>
          <Image source={{ uri: item.imageLink?.[1] || '' }} style={styles.additionalImage} />
          <Image source={{ uri: item.imageLink?.[2] || '' }} style={styles.additionalImage} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9', // Background for better contrast
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Placeholder background color
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e91e63', // Price color (e.g. pink for attention)
  },
  additionalImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  additionalImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginHorizontal: 5,
    resizeMode: 'cover',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ItemRelated;
