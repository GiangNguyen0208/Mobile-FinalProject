import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useNavigation
import OnBoarding from '../../client/components/Onboarding/Onboarding';
import Rating from '../../client/components/Rating/StartRender';
import NotificationPopup from '../../client/components/NotificationPopup';
import { getProductById, getListImageByProductID } from '../../../api/shopApi'; // Thêm API để lấy thông tin sản phẩm
import { SafeAreaView } from 'react-native-safe-area-context';

const DetailProductShopScreen = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };


  const route = useRoute();
  const navigation = useNavigation();
  const { item, shopId } = route.params || {}; 
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState(item); // State để lưu thông tin sản phẩm
  const productID = item.id;

  useEffect(() => {
    const fetchListImageByProductID = async () => {
      try {
        const listImage = await getListImageByProductID(productID);
        setImages(listImage.result || []);
      } catch (error) {
        console.error("Error fetching image list data:", error);
      }
    };
    fetchListImageByProductID();
  }, [productID]);

  // Sử dụng useFocusEffect để tải lại dữ liệu mỗi khi quay lại màn hình này
  useFocusEffect(
    React.useCallback(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await getProductById(productID); // Gọi API để lấy lại thông tin sản phẩm
          setProduct(response.result); // Cập nhật lại sản phẩm
          <NotificationPopup
                visible={isPopupVisible}
                onClose={togglePopup}
                message="Đây là thông báo mẫu!"
                title="Chú ý"
            />
        } catch (error) {
          console.error('Có lỗi khi tải lại sản phẩm:', error);
        }
      };

      fetchProductDetails();
    }, [productID]) // Chỉ gọi lại khi productID thay đổi
  );

  // Hàm điều hướng đến màn hình chỉnh sửa sản phẩm
  const navigateToEditProduct = () => {
    navigation.navigate('EditProduct', { item: product, shopId });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer} >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chi Tiết Sản Phẩm</Text>
        </View>
        <OnBoarding images={images} />
        <View style={styles.container}>
          {product ? (
            <>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.description}>Danh mục sản phẩm: {product.categoryName}</Text>
              <Text style={styles.description}>Mô tả: {product.des}</Text>
              <Text style={styles.description}>Giá: {product.price} $</Text>
              <Text style={styles.description}>Số lượng: {product.quantity}</Text>
              <View style={styles.ratingContainer}>
                <Text style={styles.description}>Đánh giá</Text>
                <Rating rating={product.rating} />
              </View>
              <Text style={styles.promotionHeader}>Ưu đãi Thứ 3:</Text>
              <Text style={styles.promotionDetail}>
                - Nhập mã <Text style={styles.bold}>VANAN40</Text>, <Text style={styles.bold}>VANMCN40K</Text> hoặc <Text style={styles.bold}>VANMCN40S</Text> để được giảm 40.000đ, áp dụng cho đơn từ 119.000đ.
              </Text>
              <Text style={styles.description}>Tình trạng: {product.status === "ON_SALE" ? "Đang bán" : "Hết hàng" }</Text>
            </>
          ) : (
            <Text style={styles.noDetails}>Không có thông tin chi tiết sản phẩm.</Text>
          )}

          {/* Nút chỉnh sửa sản phẩm */}
          <TouchableOpacity style={styles.editButton} onPress={navigateToEditProduct}>
            <Text style={styles.editButtonText}>Chỉnh sửa sản phẩm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#E95322',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#fff',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,  // To add shadow on Android
    shadowColor: '#000',  // iOS shadow styling
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#E95322',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  promotionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E95322',
    marginBottom: 10,
  },
  promotionDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
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
  editButton: {
    backgroundColor: '#E95322',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 80,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailProductShopScreen;
