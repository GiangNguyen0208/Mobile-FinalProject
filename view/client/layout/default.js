import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import OnBoarding from '../components/Onboarding/Onboarding';
import Intro from '../components/Intro/Intro';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import ListHorizontal from '../components/ListItem/ListHorizontal';
import { getAllCategory, getAllProduct } from '../../../api/systemApi';
import { addToCart } from '../../../api/cartApi';
import Item from '../components/ListItem/Item';
import { Outlet } from 'react-router-native';
import ProductDetail from '../pages/detail/detail';
import slides from '../partials/Slide/slide';

const Default = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showOutlet, setShowOutlet] = useState(false);
  const [foodData, setFoodData] = useState([]); 
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  // Call API to get all products
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const data = await getAllProduct();
        const processedData = data.result.map(item => {
          const base64Image = item.images && item.images.length > 0 && item.images[0].imageUrl
          ? `data:image/jpeg;base64,${item.images[0].imageUrl}`
          : null;
          return { ...item, base64Image };
        });
        setFoodData(processedData); 
        setLoading(false); // Đặt trạng thái loading thành false khi dữ liệu đã được tải
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false); // Đặt trạng thái loading thành false khi có lỗi
      }
    };
    
    const fetchCategoryData = async () => {
      try {
        const data = await getAllCategory();
        setCategoryData(data); 
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchFoodData();
    fetchCategoryData();
  }, []);
  
  useEffect(() => {
    setShowOutlet(route.name !== 'Default'); // Hiển thị Outlet nếu không phải trang Home
  }, [route.name]);

  const handleItemPress = (item) => {
    navigation.navigate('ProductDetail', { item }); // Chuyển item vào route
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
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
      {/* Nội dung chính */}
      {showOutlet ? (
        <ScrollView style={styles.containerScrollView}>
          <View style={{ flex: 15 }}>
            <Outlet />
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.containerScrollView}>
          <View style={styles.contentContainer}>
            <SearchBox placeholder="Search Food..." onSearch={handleSearch} />

            <OnBoarding slides={slides}/>

            <Intro items={foodData} onItemPress={handleItemPress} />

            <View style={styles.collectionHeader}>
              <Text style={styles.collectionTitle}>Collections</Text>
              <Text style={styles.viewAllText}>View All</Text>
            </View>

            <ListHorizontal items={foodData} onItemPress={handleItemPress} />

            <View style={styles.container}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : foodData.length > 0 ? (
                foodData.map((item) => (
                  <Item
                    key={item.id}
                    image={item.base64Image} 
                    title={item.name}
                    description={item.des} 
                    price={item.price}
                    rating={item.rating}
                    onPress={() => handleItemPress(item)}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                ))
              ) : (
                <Text>Can't upload data from db.</Text>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Default;
