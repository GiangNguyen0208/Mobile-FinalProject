import {
    Image,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    SafeAreaView,
    FlatList,
    Button, ScrollView, Alert,
} from "react-native";
import React, { useEffect, useState } from 'react';
import defStyles from '../../../../public/client/stylesheet/default.style';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import itemdetail from "../../../client/pages/shop/ProductDetail";
import ProductList from "../../components/ListItem/ProductList";
import ListHorizontal from "../../components/ListItem/ListHorizontal";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { getListProductByShopId, getShopById, getVouchersByShop } from "../../../../api/systemApi";
import StarRender from '../../components/Rating/StartRender'
import Item from '../../components/ListItem/Item';
import { addToCart } from '../../../../api/cartApi';


const { width, height } = Dimensions.get('window');
const ProductDetail = ({ route, navigation }) => {
    // const { shopId } = route.params;
    const [shop, setShop] = useState([]); // Dữ liệu sản phẩm
    const [products, setProducts] = useState([]);
    const [voucher, setVoucher] = useState([]);
    const shopId = 4;



    useEffect(() => {
        const fetchshop = async () => {
            try {
                const vouchersresponse = await getVouchersByShop(shopId);
                const vouchers = vouchersresponse.result || [];
                setVoucher(vouchers);
                const productsresponse = await getListProductByShopId(shopId);
                const products = productsresponse.result || [];
                setProducts(products);
                console.log(products)
                // Gọi API lấy dữ liệu theo shop id
                const shopData = await getShopById(shopId);
                setShop(shopData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchshop(); // Gọi hàm fetchProductsAndCategories
    }, [shopId]);

    return (
        <SafeAreaView style={[defStyles.container, styles.bgWhite]}>
            <ScrollView>
                <View>
                    <View >
                        <Image
                            source={{ uri: shop.image }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.itemInfo}>
                        <View style={[styles.row, styles.shopTitle]}>
                            <Text style={styles.favorite}>Yêu thích</Text>
                            <View style={[styles.row, { top: 3 }]}>
                                <Ionicons name="shield-checkmark" size={26} color="#FFD12F" />
                                <Text style={[styles.itemName, { bottom: 4 }]}> {shop.name}</Text>
                            </View>
                            <TouchableOpacity>
                                <Feather style={[styles.bgWhite, styles.infoIcon]} name="info" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, styles.justifyBw]}>
                            <View style={styles.row}>
                                <StarRender rating={shop.rating}></StarRender>
                                <TouchableOpacity style={[styles.row, { top: 4 }]} onPress={() => navigation.navigate('Rating', { shopId: shop.id })}>
                                    <Text></Text>
                                    <Text style={{ fontSize: 16 }}>Bình luận </Text>
                                    <Feather name="chevron-right" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bank_space}></View>
                </View>
                <View style={[styles.bgWhite, styles.shipInfo]}>
                    <View style={[styles.row, styles.shopTitleContainer]}>
                        <View style={styles.shipIcon}>
                            <FontAwesome5 name="shipping-fast" size={24} color="#E95322" />
                        </View>
                        <View >
                            <Text style={styles.shipTitle}>Giao hàng tiêu chuẩn</Text>
                            <View style={styles.row}>
                                <Text style={styles.shipTitle}>Dự kiến giao lúc</Text>
                                <ShippingTime minutes={22} />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.voucherContainer, styles.row]}>
                        <View>
                            <FlatList
                                data={voucher.slice(0, 2)}  // Chỉ lấy 2 item đầu tiên
                                renderItem={({ item }) => (
                                    <View style={[styles.voucherContainer, styles.row]}>
                                        <FontAwesome name="tag" size={18} color="#E95322" />
                                        <Text style={styles.voucherTitle} numberOfLines={1} ellipsizeMode="tail">
                                            Nhập "{item.code}": giảm {item.valueDiscount} %
                                        </Text>
                                    </View>
                                )}
                                keyExtractor={item => item.id.toString()}
                                scrollEnabled={false}
                            />
                        </View>
                        {/* chuyển trang tới voucher list user */}
                        <TouchableOpacity style={[styles.row, styles.seeAll]} onPress={() => navigation.navigate('Voucher')}>
                            <Text style={{ fontSize: 16, color: '#808080' }}>Xem tất cả</Text>
                            <Feather name="chevron-right" size={24} color="#808080" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={products}  // Chỉ lấy 2 item đầu tiên
                        renderItem={({ item }) => (
                            <Item
                            key={item?.id}
                            image={item?.imageLink?.[0]} 
                            title={item?.name}
                            description={item?.des} 
                            price={item?.price}
                            rating={item?.rating}
                            onPress={() => handleItemPress(item)}
                            onAddToCart={() => handleAddToCart(item)}>
                            </Item>
                        )}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const addMinutesToCurrentTime = (minutes) => {
    let currentDate = new Date();  // Lấy thời gian hiện tại
    currentDate.setMinutes(currentDate.getMinutes() + minutes);  // Cộng thêm số phút
    return currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });  // Trả về thời gian định dạng HH:MM
};

const ShippingTime = ({ minutes }) => {
    return (
        <Text style={{ fontSize: 16, left: 36 }}>{addMinutesToCurrentTime(minutes)}</Text>
    );
};

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


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        width: 300,
        height: 110,
        margin: 10,
        justifyContent: 'center'
    },

    seeAll: {
        top: 48
    },
    shipInfo: {
        height: 150
    },
    shipIcon: {
        backgroundColor: '#FFEADE',
        height: 52,
        width: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 32,
        left: 16,

    },
    shopTitleContainer: {
        top: 8,
    },
    shipTitle: {
        fontSize: 16,
        left: 32,
    },
    voucherContainer: {
        padding: 8,
        marginVertical: 2,
    },
    voucherTitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 20,
        marginLeft: 8,
    },

    infoIcon: {
        position: 'relative',
        top: -24,
        padding: 4,
        borderRadius: 32,
        alignSelf: "flex-end",
        right: -80,
    },
    popularListContainer: {
        width: '100%'
    },
    ratingStar: {
        width: 120,
    },
    popularList: {
        width: '100%',
        color: '#E95322',
        marginHorizontal: 12,
        fontSize: 20,
        fontWeight: '500'
    },
    bgWhite: {
        backgroundColor: 'white',
    },
    bank_space: {
        backgroundColor: '#f2f3f5',
        width: '100%',
        height: 12
    },
    image: {
        width: width,
        height: height * 0.30,
        resizeMode: 'cover',
        position: 'relative',
    },
    row: {
        flexDirection: "row",
    },
    justifyBw: {
        justifyContent: "space-between"
    },
    backButton: {
        position: 'relative',
        top: 50,
        left: 10,
        padding: 8,
        zIndex: 1,
    },
    col: {
        flexDirection: "column",
        justifyContent: "space-around"
    },
    itemInfo: {
        marginHorizontal: 12,
        height: 100,
        justifyContent: "space-around"
    },
    itemName: {
        fontSize: 24,
        fontWeight: '600'
    },
    itemDes: {
        marginVertical: 12,
        fontSize: 16,
        fontWeight: null
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: '#E95322',
    },
    alignSelf: {
        paddingVertical: 2
    },
    favorite: {
        backgroundColor: "#E95322",
        width: 90,
        borderRadius: 8,
        marginRight: 12,
        color: 'white',
        textAlign: 'center',
        lineHeight: 30,
        fontSize: 16,

    },
    shopTitle: {
        justifyContent: null,
    },
})


export default ProductDetail;
