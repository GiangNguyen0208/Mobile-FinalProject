import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import OnBoarding from '../../components/Onboarding/Onboarding';
import slideDetail from '../../partials/SlideDetail/slideDetail';
import NavigationRelative from '../../components/Navigation/NavigationRelative'; // Giữ nguyên hoặc thay đổi component nếu cần
import Rating from '../../components/Rating/StartRender';
import RelatedFoodScreen from './foodRelated';
import RelatedShopScreen from './shopRelated';

const ProductDetail = () => {
    const [selectedOption, setSelectedOption] = useState('foodRelated');
    const route = useRoute();
    const { item } = route.params || {}; // Lấy dữ liệu item từ params

    const navRoutes = [
        { key: 'foodRelated', title: 'Món Ăn Liên Quan' },
        { key: 'ShopRelated', title: 'Cửa Hàng Liên Quan' },
    ];

    const renderContent = () => {
        switch (selectedOption) {
            case 'foodRelated':
                return <RelatedFoodScreen itemId={item.id} />;
            case 'ShopRelated':
                return <RelatedShopScreen itemId={item.id} />;
            default:
                return <RelatedFoodScreen itemId={item.id} />;
        }
    };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chi Tiết Sản Phẩm</Text>
        </View>
        <OnBoarding slides={slideDetail} />
        <View style={styles.container}>
          {item ? (
            <>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>Mô tả: {item.des}</Text>
              <Text style={styles.description}>Giá: {item.price} $</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.description}>Đánh giá</Text>
                <Rating rating={item.rating} />
              </View>
              <Text style={styles.promotionHeader}>Ưu đãi Thứ 3:</Text>
              <Text style={styles.promotionDetail}>
                - Nhập mã <Text style={styles.bold}>VANAN40</Text>, <Text style={styles.bold}>VANMCN40K</Text> hoặc <Text style={styles.bold}>VANMCN40S</Text> để được giảm 40.000đ, áp dụng cho đơn từ 119.000đ.
              </Text>
            </>
          ) : (
            <Text style={styles.noDetails}>Không có thông tin chi tiết sản phẩm.</Text>
          )}
          
          <View style={styles.navContainer}>
            {navRoutes.map((route) => (
                <TouchableOpacity
                    key={route.key}
                    style={[styles.navItem, selectedOption === route.key && styles.activeNavItem]}
                    onPress={() => setSelectedOption(route.key)}
                >
                    <Text style={[styles.navText, selectedOption === route.key && styles.activeNavText]}>
                    {route.title}
                    </Text>
                </TouchableOpacity>
            ))}
          </View>
          
          {/* Render data */}
          {renderContent()} 

        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  starContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  promotionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  promotionDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#000',
  },
  noDetails: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  navContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeNavItem: {
    borderBottomColor: '#000',  // Khi tab được chọn, thêm đường viền dưới
  },
  navText: {
    fontSize: 16,
    color: '#555',
  },
  activeNavText: {
    color: '#000',  // Khi tab được chọn, đổi màu chữ
  },
});

export default ProductDetail;
