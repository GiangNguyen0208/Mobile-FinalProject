import { TouchableOpacity, View, StyleSheet, FlatList, Text, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import ItemCard from "../../client/components/ListItem/ItemCard";
import CartIcon from "../../client/components/Cart/CartIcon";
import ProductList from "../../client/components/ListItem/ProductList";
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from "react-native-safe-area-context";
import { getListProductByShopId, getListCategoryByShopId } from "../../../api/shopApi";
import { useAuth } from "../../context/Auth/AuthContext";

class Item {
    constructor(id, name, price, img, categoryId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.categoryId = categoryId;
    }
}

const Menu = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState('food');
    const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
    const [category, setCategory] = useState([]); 
    const { shopId } = useAuth();
    useEffect(() => {
        console.log("ID Shop: " + shopId);
        const fetchProductsAndCategories = async () => {
    try {
        const productsData = await getListProductByShopId(shopId);
        const categoryData = await getListCategoryByShopId(shopId);

        console.log("Products API response:", productsData);
        console.log("Category API response:", categoryData);

        const productsArray = productsData.result || [];
        const categoryArray = categoryData.result || [];

        setProducts(productsArray);
        setCategory(categoryArray);
    } catch (error) {
        if (error.response) {
            console.error(`Error ${error.response.status}:`, error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
};

        fetchProductsAndCategories(); // Gọi hàm fetchProductsAndCategories
    }, [shopId]);

    useEffect(() => {
        console.log("Fetched products data:", products); // Log dữ liệu của products
    }, [products]);

    useEffect(() => {
        console.log("Fetched category data:", category); // Log dữ liệu của category
    }, [category]); // Sửa lại đây để theo dõi sự thay đổi của category


    const handleAddFood = () => {
        navigation.navigate('AddProduct', {
            onAddProduct: (newProduct) => {
                setProducts((prevProducts) => [...prevProducts, newProduct]);
            },
        });
    };
    
    const handleAddCategory = () => {
        console.log("Thêm danh mục mới");
        // Thêm logic để xử lý khi người dùng nhấn "Thêm danh mục"
    };


   
    const renderFood = ({ item }) => (
        <ItemCard type={'product'} item={item} navigation={navigation} isShopOwner={true}></ItemCard>
    );

    const renderCategory = ({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name}</Text>
        </View>
    );


    return (
        <SafeAreaView>
            <View style={[styles.row, { backgroundColor: 'white' }]}>
                <TouchableOpacity style={[styles.funcContainer, styles.row, selectedCategory === 'food' && styles.selected]} onPress={() => setSelectedCategory('food')}>
                    <Text style={[styles.funcName, selectedCategory === 'food' && { color: '#E95322', }]} numberOfLines={1} ellipsizeMode="tail">
                        Món
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.funcContainer, styles.row, selectedCategory === 'category' && styles.selected]} onPress={() => setSelectedCategory('category')}>
                    <Text style={[styles.funcName, selectedCategory === 'category' && { color: '#E95322', }]} numberOfLines={1} ellipsizeMode="tail">
                        Danh mục
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={selectedCategory === 'food' ? products : category}
                renderItem={selectedCategory === 'food' ? renderFood : renderCategory}
                keyExtractor={(item) => item.id.toString()} // Chuyển đổi id thành chuỗi
                style={{ height: '100%' }}
                contentContainerStyle={{ paddingBottom: 120 }}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.addFoodBtn}  onPress={selectedCategory === 'food' ? handleAddFood : handleAddCategory}>
                    <Text style={{ color: "white", fontSize: 16, textAlign: 'center' }}>{selectedCategory === 'food' ? 'Thêm món' : 'Thêm danh mục'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};


const styles = StyleSheet.create({
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
    item: {
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
    },
    btnContainer: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 5,
        height: 120,
        position: 'absolute',
        bottom: 0,
    },
    addFoodBtn: {
        width: '95%',
        paddingVertical: 8,
        marginVertical: 14,
        backgroundColor: '#E95322',
        borderRadius: 8,
    },
})
export default Menu;
