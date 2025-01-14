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
import { getListProductByShopName } from "../../../../api/adminApi";
import ItemCard from '../../components/ListItem/ItemCard';
const { width, height } = Dimensions.get('window');


const voucherData = [
    {
        id: 1,
        code: 'SALE20',
        description: 'Giảm 20% cho đơn hàng từ 200.000đ',
        discountPercentage: 20,
        minOrderValue: 200000,
        expiryDate: '2024-12-31',
        remaining: 50, // số lượng voucher còn lại
    },
    {
        id: 2,
        code: 'FREESHIP50',
        description: 'Miễn phí vận chuyển cho đơn hàng từ 50.000đ',
        discountPercentage: 0, // giảm tiền ship, không giảm giá sản phẩm
        freeShipping: true, // cờ đánh dấu voucher là freeship
        minOrderValue: 50000,
        expiryDate: '2024-11-30',
        remaining: 100,
    },
    {
        id: 3,
        code: 'NEWUSER30',
        description: 'Giảm 30% cho người dùng mới, tối đa 100.000đ',
        discountPercentage: 30,
        maxDiscountValue: 100000, // giá trị giảm giá tối đa
        minOrderValue: 0, // không có giá trị đơn hàng tối thiểu
        expiryDate: '2024-12-31',
        remaining: 30,
    },
    {
        id: 4,
        code: 'BUY1GET1',
        description: 'Mua 1 tặng 1 cho sản phẩm áp dụng',
        discountType: 'buy1get1', // loại khuyến mãi "mua 1 tặng 1"
        expiryDate: '2024-10-31',
        remaining: 20,
    },
    {
        id: 5,
        code: 'FLASH50',
        description: 'Giảm ngay 50% cho đơn hàng trong 24 giờ',
        discountPercentage: 50,
        minOrderValue: 100000,
        expiryDate: '2024-10-25',
        remaining: 10,
    },
];
const ProductDetail = ({ route, navigation }) => {

    const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
    const shopName = 'Nhà hàng Lẩu'
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                // Gọi API lấy dữ liệu sản phẩm theo tên shop
                const productsData = await getListProductByShopName(shopName);

                // Lấy danh sách kết quả từ API (đảm bảo dữ liệu không undefined)
                const productsArray = productsData.result || [];

                // Cập nhật state
                setProducts(productsArray);
            } catch (error) {
                console.error("Error fetching product or category data:", error);
            }
        };

        fetchProductsAndCategories(); // Gọi hàm fetchProductsAndCategories
    }, [shopName]);

    useEffect(() => {
        console.log("Fetched products data:", products); // Log dữ liệu của products
    }, [products]);
    // const { shop } = route.params;
    const [isFilled, setIsFilled] = useState(false);

    const addFavorite = () => {
        if (isFilled) {
            Alert.alert('Đã xóa khỏi danh sách yêu thích')
        } else {
            Alert.alert('Đã thêm vào danh sách yêu thích')
        }

        setIsFilled(!isFilled); // Đổi trạng thái giữa rỗng và đầy
    };


    return (
        <SafeAreaView style={[defStyles.container, styles.bgWhite]}>
            <ScrollView>
                <View>
                    <View >
                        <Image source={require("./../../../../assets/img/order-food.png")} style={[styles.image]} />
                    </View>
                    <View style={styles.itemInfo}>
                        <View style={[styles.row, styles.shopTitle]}>
                            <Text style={styles.favorite}>Yêu thích</Text>
                            <View style={[styles.row, { top: 3 }]}>
                                <Ionicons name="shield-checkmark" size={26} color="#FFD12F" />
                                <Text style={[styles.itemName, { bottom: 4 }]}> Shop vui ve</Text>
                            </View>
                            <TouchableOpacity>
                                <Feather style={[styles.bgWhite, styles.infoIcon]} name="info" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, styles.justifyBw]}>
                            <View style={styles.row}>
                                <StarRender rating={1.2}></StarRender>
                                <TouchableOpacity style={[styles.row, { top: 2 }]} onPress={() => navigation.navigate('Rating')}>
                                    <Text></Text>
                                    <Text style={{ fontSize: 16 }}>Bình luận </Text>
                                    <Feather name="chevron-right" size={24} color="black" />
                                </TouchableOpacity>
                                <View style={[styles.row, { top: 4 }]}>
                                    <Feather name="clock" size={20} color="black" />
                                    <Text style={{ fontSize: 16, lineHeight: 20, left: 6, top: 1 }}>22 phút</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={addFavorite}>
                                <Ionicons name={isFilled ? "heart-sharp" : "heart-outline"} size={24} color={isFilled ? "red" : "black"} style={[styles.alignSelf, itemdetail.itemName]} />
                            </TouchableOpacity>
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
                        <VoucherTwo></VoucherTwo>
                        <TouchableOpacity style={[styles.row, styles.seeAll]} >
                            <Text style={{ fontSize: 16, color: '#808080' }}>Xem tất cả</Text>
                            <Feather name="chevron-right" size={24} color="#808080" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bank_space}></View>
                <View style={[styles.bgWhite, styles.popularListContainer]}>
                    <Text style={[styles.popularList]}>Món phổ biến</Text>
                    <ListHorizontal items={products} type={'product'} navigation={navigation} ></ListHorizontal>
                    {/* <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                            <ItemCard type={'product'} item={item} navigation={navigation} isShopOwner={false} />
                            </View>
                        )}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal={true}  // Thiết lập chiều ngang
                        showsHorizontalScrollIndicator={false}  // Ẩn thanh cuộn ngang
                        contentContainerStyle={styles.flatList} 
                        style={{ flex: 1 }}  // Tùy chỉnh style của FlatList
                    /> */}
                </View>
                <View style={styles.bank_space}></View>
                <ProductList navigation={navigation} />
            </ScrollView>
        </SafeAreaView>
    );
};

const StarRender = ({ rating }) => {
    const stars = [];
    const starRender = (rating) => {
        const fullStars = Math.floor(rating); // Số sao đầy đủ
        const halfStar = rating % 1 !== 0 ? 1 : 0; // Số nửa sao
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FontAwesome key={`star-${i}`} name="star" size={24} color="#FFD12F" />
            );
        }
        if (halfStar) {
            for (let i = 0; i < halfStar; i++) {
                stars.push(
                    <FontAwesome key={`star-half-full-${i}`} name="star-half-full" size={24} color="#FFD12F" />
                );
            }
        }
        const remainingStars = 5 - fullStars - halfStar; // Tính số sao rỗng
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <FontAwesome key={`star-o-${i}`} name="star-o" size={24} color="#FFD12F" />
            );
        }
    };
    starRender(rating);
    return (
        <View style={[styles.row, styles.ratingStar]}>
            <Text >{stars}</Text>
        </View>
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

const VoucherTwo = () => {
    // Lấy 2 voucher đầu tiên
    const firstTwoVouchers = voucherData.slice(0, 2);

    const renderItem = ({ item }) => (
        <View style={[styles.voucherContainer, styles.row]}>
            <FontAwesome name="tag" size={18} color="#E95322" />
            <Text style={styles.voucherTitle} numberOfLines={1} ellipsizeMode="tail">
                Nhập "{item.code}": {item.description}
            </Text>
        </View>
    );

    return (
        <FlatList
            data={firstTwoVouchers}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
        />
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        overflow: 'hidden',
        width: 300,
        height:110,
        margin: 10,
        justifyContent:'center'
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
