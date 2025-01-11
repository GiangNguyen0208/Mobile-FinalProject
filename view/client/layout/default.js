import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView ,StyleSheet,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import OnBoarding from '../components/Onboarding/Onboarding';
import Intro from '../components/Intro/Intro';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import ListHorizontal from '../components/ListItem/ListHorizontal';
import { getAllCategory, getAllProduct } from '../../../api/systemApi';
import Item from '../components/ListItem/Item';
import { Outlet } from 'react-router-native';
import slides from '../partials/Slide/slide';



const Default = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showOutlet, setShowOutlet] = useState(false);
  const [slides, setSlides] = useState([]); 
  const [foodData, setFoodData] = useState([]); 
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading



  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const data = await getAllProduct();
        setSlides(data.result[5])
        setFoodData(data.result); 
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

  const handleCategoryOfShopPress = (item) => {
    navigation.navigate('ShopDetailUser', { item });
  }

  const handleItemPress = (item) => {
    navigation.navigate('ProductDetailUser', { item }); // Chuyển item vào route
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
            <OnBoarding item={slides}/>
            <Intro items={categoryData} onItemPress={handleCategoryOfShopPress} />
            <View style={styles.collectionHeader}>
              <Text style={[styles.collectionTitle,{color:'#E95322',left:16}]}>FLASH SALE</Text>
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