import { TouchableOpacity, View, StyleSheet, FlatList, Text, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import ItemCard from "../../client/components/ListItem/ItemCard";
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";
import { getListProductByShopId, getListCategoryByShopId, deleteCategory } from "../../../api/shopApi";
import { useAuth } from "../../context/Auth/AuthContext";
import { useNavigation } from '@react-navigation/native';


const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('food');
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const { shopId } = useAuth();

    const navigation = useNavigation();  // Initialize useNavigation hook
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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

    useEffect(() => {
        console.log("Fetched products data:", products); // Log dữ liệu của products
    }, [products]);

    useEffect(() => {
        console.log("Fetched category data:", category); // Log dữ liệu của category
    }, [category]); // Sửa lại đây để theo dõi sự thay đổi của category


    const handleOpenModal = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setIsModalVisible(true);
        console.log(categoryId)
    };

    // Hàm đóng modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedCategoryId(null);
    };

    const handleDelCategory = async () => {
        try {
            console.log("Deleting category with ID:", selectedCategoryId);
            const result = await deleteCategory(selectedCategoryId);
            console.log('Category deleted:', result);
            setCategory(prevCategories => prevCategories.filter(category => category.id !== selectedCategoryId));
            // Sau khi xóa thành công, đóng modal và thực hiện các hành động khác nếu cần
        } catch (error) {
            console.error('Error deleting category:', error);
            // Xử lý lỗi nếu cần
        }
    };

    const handleAddProduct = () => {

        navigation.navigate('AddProduct');  // Điều hướng đến AddProduct khi nhấn "Thêm món"
    };

    const renderFood = ({ item }) => (
        <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 4 }}>
            <ItemCard
                type={'product'}
                key={item.id}
                item={item}
                shopId={shopId}
                isShopOwner={true}
                handlePress={() => navigation.navigate('DetailProductShopScreen', { item, shopId })}
            />

        </TouchableOpacity>

    );

    const renderCategory = ({ item }) => (
        <View style={[{ padding: 16, flexDirection: 'row', justifyContent: "space-between" }]}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => handleOpenModal(item.id)}><Ionicons name="trash-bin" size={24} color="#E95322" /></TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView>
            <View style={[styles.row, { backgroundColor: 'white' }]}>
                <TouchableOpacity 
                    style={[styles.funcContainer, styles.row, selectedCategory === 'food' && styles.selected]} 
                    onPress={() => setSelectedCategory('food')}
                >
                    <Text style={[styles.funcName, selectedCategory === 'food' && { color: '#E95322' }]}>Món</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.funcContainer, styles.row, selectedCategory === 'category' && styles.selected]} 
                    onPress={() => setSelectedCategory('category')}
                >
                    <Text style={[styles.funcName, selectedCategory === 'category' && { color: '#E95322' }]}>Danh mục</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={selectedCategory === 'food' ? products : category}
                renderItem={selectedCategory === 'food' ? renderFood : renderCategory}
                keyExtractor={(item) => item.id.toString()}  // Dùng id cho khóa để tối ưu
                style={{ height: '100%' }}
                contentContainerStyle={{ paddingBottom: 120 }}
            />
            {selectedCategory === "food" && (
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={styles.addFoodBtn}
                        onPress={handleAddProduct}
                    >
                        <Text style={{ color: "white", fontSize: 16, textAlign: "center" }}>
                            Thêm món
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleCloseModal} // Đóng modal khi nhấn nút back trên Android
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Bạn có chắc chắn muốn xóa danh mục này không?</Text>
                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={handleCloseModal}
                            >
                                <Text style={styles.modalButtonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={() => {
                                    handleCloseModal(); // Đóng modal
                                    handleDelCategory(); // Xử lý xóa danh mục
                                }}
                            >
                                <Text style={styles.modalButtonText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: 'gray',
    },
    confirmButton: {
        backgroundColor: '#E95322',
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 14,
    },

    row: { flexDirection: 'row' },
    funcContainer: { height: 56, marginHorizontal: 8, alignItems: 'center' },
    funcName: { fontSize: 16, paddingHorizontal: 70 },
    selected: { borderBottomWidth: 1, borderBottomColor: '#E95322' },
    btnContainer: { width: '100%', backgroundColor: 'white', alignItems: 'center', height: 120, position: 'absolute', bottom: 0 },
    addFoodBtn: { width: '95%', paddingVertical: 8, marginVertical: 14, backgroundColor: '#E95322', borderRadius: 8 },
    categoryCard: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    categoryName: { fontSize: 16, fontWeight: 'bold' },
    deleteButton: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: '#E95322', borderRadius: 5 },
    deleteButtonText: { color: 'white', fontSize: 14 },
});


export default Menu;
