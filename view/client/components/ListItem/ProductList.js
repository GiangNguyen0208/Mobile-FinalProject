import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Item from '../../components/ListItem/Item';
import { getProductsByCategory,getProductsByName } from '../../../../api/systemApi';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect, useNavigation } from '@react-navigation/native'; 
import { addToCart } from '../../../../api/cartApi';
import AntDesign from '@expo/vector-icons/AntDesign';
const ProductList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category,query } = route.params || {};

  const fetchProduct = async () => {
    setLoading(true);
    try {
      let response;
      // Nếu có category thì gọi API theo category, nếu không có thì gọi API theo tên
      if (category?.id) {
        response = await getProductsByCategory(category.id);
      } else if (query) {
        response = await getProductsByName(query);
      }
      console.log('data:', response);
      setProduct(response );
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProduct();
    }, [category?.id, query]) // Gọi lại API khi category hoặc query thay đổi
  );

  const handleItemPress = (item) => {
    navigation.navigate('ProductDetailUser', { item }); // Chuyển item vào route
  };
  const handleAddToCart = async (product) => {
    try {
      const cartData = { productId: product.id, quantity: 1 };
      const response = await addToCart(cartData); // Thêm sản phẩm với số lượng là 1
      alert(`${product.name} added to cart!`);
      console.log(response); // Đảm bảo bạn nhận được phản hồi từ API
    } catch (error) {
      alert('Failed to add to cart!');
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách sản phẩm</Text>
        <Text style={styles.headerTitle}></Text>
        {/* Bạn có thể thêm các nút hoặc icon khác vào header nếu cần */}
      </View>
      <FlatList
        data={product}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Item
              key={item?.id}
              image={item?.imageLink?.[0]}
              title={item?.name}
              description={item?.des}
              price={item?.price}
              rating={item?.rating}
              onPress={() => handleItemPress(item)}
              onAddToCart={() => handleAddToCart(item)}
            />

          </TouchableOpacity>
        )}
        keyExtractor={(_, index) => index.toString()}
        numColumns={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top:50,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ProductList;
