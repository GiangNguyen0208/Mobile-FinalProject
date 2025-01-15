import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ItemRelated from './itemRelated';
import { getProductsByCategory } from '../../../../api/systemApi';
import { useRoute } from '@react-navigation/native';

const RelatedFoodScreen = () => {
  const [data, setData] = useState([]);
  const route = useRoute();
  const { item } = route.params || {};

  useEffect(() => {
    if (!item?.categoryId) {
      console.error('Category ID is missing');
      return; // Nếu không có categoryId, không gọi API
    }
  
    const fetchProducts = async () => {
      try {
        const response = await getProductsByCategory(item.categoryId);
        console.log("Product Relative response:", response); // Log dữ liệu API
        setData(response); // Cập nhật state với dữ liệu
      } catch (error) {
        if (error.response) {
          console.error("API Error:", error.response.data); // Log lỗi trả về từ server
          console.error("Status Code:", error.response.status);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error setting up request:", error.message);
        }
      }
    };
  
    fetchProducts();
  }, [item?.categoryId]);

  const handleItemPress = (item) => {
    navigation.navigate('ProductDetailUser', { item }); // Chuyển item vào route
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {data.length > 0 ? (
        data.map((item) => (
          <ItemRelated key={item.id} item={item} onPress={() => handleItemPress(item)} />
        ))
      ) : (
        <Text style={styles.emptyText}>Không có sản phẩm nào.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});

export default RelatedFoodScreen;
