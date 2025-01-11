import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ItemRelated from './itemRelated';
import { getProductsByCategory } from '../../../../api/systemApi';
import { useRoute } from '@react-navigation/native';

const RelatedFoodScreen = () => {
  const [data, setData] = useState([]);
  const route = useRoute();
  const { categoryId } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async (categoryId) => {
      try {
        const response = await getProductsByCategory(categoryId);
        setData(response.result); // Gán danh sách sản phẩm vào state
      } catch (error) {
        console.error("Error fetching Product list data:", error);
      }
    };
    fetchProducts();
  }, [categoryId]);

  

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id} // Đảm bảo key là duy nhất
      renderItem={({ item }) => <ItemRelated item={item} />} // Hiển thị sản phẩm
      ListEmptyComponent={<Text style={styles.emptyText}>Không có sản phẩm nào.</Text>} // Hiển thị khi danh sách rỗng
    />
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
});

export default RelatedFoodScreen;
