import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import OnBoarding from '../components/Onboarding/Onboarding';
import Intro from '../components/Intro/Intro';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import { getAllCategory, getAllProduct } from '../../../api/systemApi';
import { addToCart } from '../../../api/cartApi';

import Item from '../components/ListItem/Item';
import { Outlet } from 'react-router-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 



const Default = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showOutlet, setShowOutlet] = useState(false);
  const [slides, setSlides] = useState([]); 
  const [foodData, setFoodData] = useState([]); 
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  const [selected, setSelected] = useState('nearBy');
  // const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
  // const [category, setCategory] = useState([]);
  const [shops, setShops] = useState([]);
  // const shopName = 'Nhà hàng Lẩu'


  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const data = await getAllProduct();
        setSlides(data.result[5])
        setFoodData(data.result); 
        setLoading(false); // Đặt trạng thái loading thành false khi dữ liệu đã được tải

      } catch (error) {
        console.error("Error fetching data:", error);
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
    console.log("Fetched data:", shops); // Log dữ liệu của category
  }, [shops]); // Sửa lại đây để theo dõi sự thay đổi của category


  useEffect(() => {
    setShowOutlet(route.name !== 'Default'); // Hiển thị Outlet nếu không phải trang Home
  }, [route.name]);

  const handleCategoryOfShopPress = (category) => {
    navigation.navigate('foodList', { category });
  }

  const handleItemPress = (item) => {
    navigation.navigate('ProductDetailUser', { item }); // Chuyển item vào route
  };

  const handleSearch = (query) => {
    navigation.navigate('foodList', { query });
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
    <SafeAreaView style={[styles.container, { top: 36 }]}>
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
            <OnBoarding item={slides}/>
            <Intro items={categoryData} onItemPress={handleCategoryOfShopPress} />
            <View style={styles.collectionHeader}>
              <Text style={[styles.collectionTitle, { color: '#E95322', left: 16 }]}>FLASH SALE</Text>
              <Text style={styles.viewAllText}>View All</Text>
            </View>
            <View style={styles.container}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : foodData.length > 0 ? (
                foodData.map((item) => (
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
                ))
              ) : (
                <Text>Can't upload data from db.</Text>
              )}    
            </View>
          </View>
        </ScrollView>
      )}

    <TouchableOpacity  style={styles.cartButton}
        onPress={() => navigation.navigate('Cart')} 
      >
        <Icon name="shopping-cart" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles2 = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  funcContainer: {
    height: 56,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  funcName: {
    fontSize: 16,
    paddingHorizontal: 70,
  },
  selected: {
    borderBottomWidth: 1,
    borderBottomColor: '#E95322',
  },
})
export default Default;
