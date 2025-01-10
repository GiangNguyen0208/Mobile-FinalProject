import { TouchableOpacity, View, StyleSheet, FlatList, Text } from "react-native";
import React, { useState, useEffect } from "react";
import ItemCard from "../../client/components/ListItem/ItemCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { getListProductByShopId, getListCategoryByShopId } from "../../../api/shopApi";
import { useAuth } from "../../context/Auth/AuthContext";
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('food');
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]); 
    const { shopId } = useAuth();
    const navigation = useNavigation();  // Initialize useNavigation hook

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                const productsData = await getListProductByShopId(shopId);
                const categoryData = await getListCategoryByShopId(shopId);

                setProducts(productsData.result || []);
                setCategory(categoryData.result || []);
            } catch (error) {
                console.error("Error fetching product or category data:", error);
            }
        };

        fetchProductsAndCategories();
    }, [shopId]);

    const handleAddProduct = () => {
        navigation.navigate('AddProduct');  // Điều hướng đến AddProduct khi nhấn "Thêm món"
    };

    const renderFood = ({ item }) => (
        <TouchableOpacity 
            onPress={() => navigation.navigate('DetailProductShopScreen', { item })} // Điều hướng đến ProductDetail
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
        >
            <ItemCard 
                type={'product'} 
                item={item}
                shopId={shopId}
                isShopOwner={true}>
                navigation={navigation}
            </ItemCard>
        </TouchableOpacity>
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
                    <Text style={[styles.funcName, selectedCategory === 'food' && { color: '#E95322' }]}>Món</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.funcContainer, styles.row, selectedCategory === 'category' && styles.selected]} onPress={() => setSelectedCategory('category')}>
                    <Text style={[styles.funcName, selectedCategory === 'category' && { color: '#E95322' }]}>Danh mục</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={selectedCategory === 'food' ? products : category}
                renderItem={selectedCategory === 'food' ? renderFood : renderCategory}
                keyExtractor={(item) => item.name}
                style={{ height: '100%' }}
                contentContainerStyle={{ paddingBottom: 120 }}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.addFoodBtn} onPress={handleAddProduct}>
                    <Text style={{ color: "white", fontSize: 16, textAlign: 'center' }}>
                        Thêm món
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    row: { flexDirection: 'row' },
    funcContainer: { height: 56, marginHorizontal: 8, alignItems: 'center' },
    funcName: { fontSize: 16, paddingHorizontal: 70 },
    selected: { borderBottomWidth: 1, borderBottomColor: '#E95322' },
    btnContainer: { width: '100%', backgroundColor: 'white', alignItems: 'center', height: 120, position: 'absolute', bottom: 0 },
    addFoodBtn: { width: '95%', paddingVertical: 8, marginVertical: 14, backgroundColor: '#E95322', borderRadius: 8 },
});

export default Menu;
