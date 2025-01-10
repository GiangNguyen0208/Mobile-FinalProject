import { Animated, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect  } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationPopup from '../../client/components/NotificationPopup';
import { deleteProduct, getListCategoryByShopId, getListProductByShopId, updateDataProduct } from '../../../api/shopApi';

const EditProduct = ({ route, navigation }) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    
        const togglePopup = () => {
            setIsPopupVisible(!isPopupVisible);
        };
    const { item, shopId } = route.params;
    const [text, setText] = useState(item.des ?? ''); // Khởi tạo mô tả ban đầu
    const [name, setName] = useState(item.name ?? ''); // Khởi tạo tên món ban đầu
    const [price, setPrice] = useState(item.price?.toString() ?? ''); // Khởi tạo giá món ban đầu
    const [category, setCategory] = useState(item.categoryName ?? '');
    const [quantity, setQuantity] = useState(item.quantity?.toString() ?? ''); 
    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState(item.status); 

    useFocusEffect(
        React.useCallback(() => {
            const fetchProductDetails = async () => {
                try {
                    const response = await getListProductByShopId(item.id); // Lấy thông tin sản phẩm mới nhất từ API
                    setName(response.result.name);
                    setPrice(response.result.price);
                    setCategory(response.result.categoryName);
                    setText(response.result.description);
                    setQuantity(response.result.quantity);
                    setStatus(response.result.status);
                } catch (error) {
                    console.error('Có lỗi xảy ra khi tải lại sản phẩm:', error);
                }
            };

            fetchProductDetails();
        }, [item.id]) // Chỉ gọi lại khi item.id thay đổi
    );



    const handleChangeText = (inputText) => {
        setText(inputText);
    };

    const handleNameChange = (inputName) => {
        setName(inputName);
    };
    const handleQuantityChange = (inputQuantity) => {
        setQuantity(inputQuantity);
    };

    const handlePriceChange = (inputPrice) => {
        setPrice(inputPrice);
    };

    const handleSwitchChange = (newValue) => {
        const newStatus = newValue ? "ON_SALE" : "OUT_OF_STOCK"; 
        setStatus(newStatus); 
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoryData = await getListCategoryByShopId(shopId);
                setCategories(categoryData.result || []);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };
        fetchCategories();
    }, [shopId]);

    const handleDelete = async () => {
        try {
            await deleteProduct(item.id);
            setIsPopupVisible(true);
            navigation.goBack();
            <NotificationPopup
                visible={isPopupVisible}
                onClose={togglePopup}
                message="Xóa sản phẩm thành công!"
                title="Thông báo"
            />
        } catch (error) {
            console.error('Có lỗi xảy ra khi Xóa sản phẩm:', error);
            alert('Cập nhật sản phẩm thất bại.');
        }
    }

    const handleSave = async () => {
        if (!name.trim()) {
            alert('Tên sản phẩm không được để trống');
            return;
        }
        if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            alert('Giá sản phẩm phải là số lớn hơn 0');
            return;
        }
        if (!quantity || isNaN(parseInt(quantity)) || parseInt(quantity) < 0) {
            alert('Số lượng sản phẩm phải là số không âm');
            return;
        }
    
        const updatedData = {
            name: name.trim(),
            price: parseFloat(price),
            categoryName: category || item.categoryName,
            description: text.trim(),
            status: status,
            quantity: parseInt(quantity),
        };
    
        try {
            const response = await updateDataProduct(item.id, updatedData);
            setIsPopupVisible(true);
            console.log("Product Update: " + response.result);
            navigation.goBack();
            <NotificationPopup
                visible={isPopupVisible}
                onClose={togglePopup}
                message="Cập nhật sản phẩm thành công!"
                title="Thông báo"
            />
        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật sản phẩm:', error);
            alert('Cập nhật sản phẩm thất bại.');
        }
    };
    
    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ padding: 16 }}>
                <Text style={styles.sectionTitle}>Chỉnh sửa sản phẩm</Text>
                
                <View style={[styles.row, styles.info]}>
                    <Text style={styles.label}>Ảnh món</Text>
                    <Image source={{ uri: item?.imageLink?.[0] }} style={styles.image} />
                </View>
    
                <View style={styles.info}>
                    <Text style={styles.label}>Tên món</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleNameChange}
                        value={name}
                        placeholder="Nhập tên món"
                    />
                </View>
    
                <View style={styles.info}>
                    <Text style={styles.label}>Giá</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handlePriceChange}
                        value={price}
                        keyboardType="numeric"
                        placeholder="Nhập giá món"
                    />
                </View>
    
                <View style={styles.info}>
                    <Text style={styles.label}>Số lượng</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleQuantityChange}
                        value={quantity}
                        keyboardType="numeric"
                        placeholder="Nhập số lượng"
                    />
                </View>
    
                <View style={styles.info}>
                    <Text style={styles.label}>Chọn danh mục</Text>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                    >
                        <Picker.Item label={item.categoryName} value={item.categoryName} />
                        {categories.map((cat) => (
                            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                        ))}
                    </Picker>
                </View>
    
                <View style={styles.switchRow}>
                    <Text style={styles.label}>{status === 'ON_SALE' ? "Còn hàng" : "Hết hàng"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#4cd137" }}
                        thumbColor={'white'}
                        value={status === "ON_SALE"}
                        onValueChange={handleSwitchChange}
                    />
                </View>
    
                <View style={styles.info}>
                    <Text style={styles.label}>Mô tả</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChangeText}
                        value={text}
                        placeholder="Không bắt buộc"
                    />
                </View>
    
                <TouchableOpacity style={styles.deleteBtn}  onPress={handleDelete}>
                    <Text style={styles.btnText}>Xóa món khỏi thực đơn</Text>
                </TouchableOpacity>
            </View>
    
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.addFoodBtn} onPress={handleSave}>
                    <Text style={styles.btnText}>Lưu</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
    
};

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 16,
    },
    info: {
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    btnContainer: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 5,
        height: 80,
        position: 'absolute',
        bottom: 0,
    },
    addFoodBtn: {
        width: '95%',
        paddingVertical: 12,
        marginVertical: 14,
        backgroundColor: '#E95322',
        borderRadius: 8,
    },
    deleteBtn: {
        width: '95%',
        paddingVertical: 12,
        marginVertical: 14,
        backgroundColor: '#E95322',
        borderRadius: 8,
    },
    btnText: {
        color: "white",
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 14,
        backgroundColor: '#f9f9f9',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 10,
    },
});


export default EditProduct;
