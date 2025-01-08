import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ItemRelated from './itemRelated';

const RelatedFoodScreen = ({ categoryId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  // Fetch Data, Call API
  useEffect(() => {
    if (categoryId) {
      fetchRelatedData(categoryId);
    }
  }, [categoryId]);

  const fetchProducts = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const products = await getProductsByCategory(id);
      setData(products); // Gán danh sách sản phẩm vào state
    } catch (err) {
      setError('Không thể tải sản phẩm.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()} // Đảm bảo key là duy nhất
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
