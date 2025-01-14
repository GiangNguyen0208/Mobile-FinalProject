import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import OnBoarding from '../components/Onboarding/Onboarding';
import Intro from '../components/Intro/Intro';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import ListHorizontal from '../components/ListItem/ListHorizontal';
import Item from '../components/ListItem/Item';
import { Outlet } from 'react-router-native';

import { getAllCategory, getAllProduct } from '../../../api/systemApi';
import { getCategoryList } from "../../../api/userApi";
import { getListProductByShopName, getListShop } from "../../../api/adminApi";

import ProductDetail from '../pages/detail/detail';
import slides from '../partials/Slide/slide';



const Default = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showOutlet, setShowOutlet] = useState(false);
  const [selected, setSelected] = useState('nearBy');
  const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
  const [category, setCategory] = useState([]);
  const [shops, setShops] = useState([]);
  const shopName = 'Nhà hàng Lẩu'
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        // Gọi API lấy dữ liệu sản phẩm theo tên shop
        const productsData = await getListProductByShopName(shopName);
        const categoryData = await getCategoryList();
        const shopData = await getListShop();

        // Lấy danh sách kết quả từ API (đảm bảo dữ liệu không undefined)
        const productsArray = productsData.result || [];
        const categoryArray = categoryData.result || [];
        const shopArray = shopData.result || [];
        // Cập nhật state
        setProducts(productsArray);
        setCategory(categoryArray);
        setShops(shopArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsAndCategories();
  }, [shopName]);

  useEffect(() => {
    console.log("Fetched data:", shops); // Log dữ liệu của category
  }, [shops]); // Sửa lại đây để theo dõi sự thay đổi của category


  useEffect(() => {
    setShowOutlet(route.name !== 'Default'); // Hiển thị Outlet nếu không phải trang Home
  }, [route.name]);

  const handleItemPress = (item) => {
    navigation.navigate('ProductDetail', { item }); // Chuyển item vào route
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
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

            <OnBoarding slides={slides} />

            {/* Intro */}

            <Intro items={category} onItemPress={handleItemPress} />
            <View style={styles.collectionHeader}>
              <Text style={[styles.collectionTitle, { color: '#E95322', left: 16 }]}>FLASH SALE</Text>
              <Text style={styles.viewAllText}>View All</Text>
            </View>
            <ListHorizontal items={products} type={'product'} navigation={navigation} ></ListHorizontal>

            <View style={styles.container}>

              <View style={[styles2.row, { backgroundColor: 'white' }]}>
                <TouchableOpacity style={[styles2.funcContainer, styles2.row, selected === 'nearBy' && styles2.selected]} onPress={() => setSelected('nearBy')}>
                  <Text style={[styles2.funcName, selected === 'NearBy' && { color: '#E95322', }]} numberOfLines={1} ellipsizeMode="tail">
                    Gần tôi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles2.funcContainer, styles2.row, selected === 'rating' && styles2.selected]} onPress={() => setSelected('rating')}>
                  <Text style={[styles2.funcName, selected === 'rating' && { color: '#E95322', }]} numberOfLines={1} ellipsizeMode="tail">
                    Đánh giá
                  </Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={selected === 'nearBy'
                  ? shops.slice(0, 5)
                  : shops.slice().sort((a, b) => b.rating - a.rating).slice(0, 5)}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Item image={item.image} title={item.name} rating={item.rating}  ></Item>
                  </View>
                )}
                keyExtractor={(item) => item.id}
                style={{ height: '100%' }}
                contentContainerStyle={{ paddingBottom: 120 }}
                scrollEnabled={false}
              />
            </View>
          </View>
        </ScrollView>
      )}
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
