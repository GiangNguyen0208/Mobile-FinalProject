import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddProduct = () => {
    // State cho Category
    const [categoryName, setCategoryName] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('active');
    const [categoryShopId, setCategoryShopId] = useState('');

    // State cho Product
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productStatus, setProductStatus] = useState('active');
    const [productCategory, setProductCategory] = useState('');

    // Mảng để lưu danh sách các category
    const [categories, setCategories] = useState([]);

    // Xử lý khi submit form Category
    const handleCategorySubmit = () => {
        const newCategory = {
            id: categories.length + 1,
            name: categoryName,
            status: categoryStatus,
            shopId: categoryShopId,
        };

        // Thêm danh mục mới vào mảng categories
        setCategories([...categories, newCategory]);

        // In thông tin danh mục vừa thêm
        console.log('Danh mục mới:', newCategory);

        // Xóa thông tin vừa nhập sau khi thêm
        setCategoryName('');
        setCategoryStatus('active');
        setCategoryShopId('');
    };

    // Xử lý khi submit form Product
    const handleProductSubmit = () => {
        const newProduct = {
            name: productName,
            description: productDescription,
            price: productPrice,
            quantity: productQuantity,
            status: productStatus,
            categoryId: productCategory,
        };

        // In thông tin sản phẩm vừa thêm
        console.log('Thông tin sản phẩm:', newProduct);

        // Xóa thông tin vừa nhập sau khi thêm
        setProductName('');
        setProductDescription('');
        setProductPrice('');
        setProductQuantity('');
        setProductStatus('active');
        setProductCategory('');
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}>
                    {/* Form Category */}
                    <View style={{
                        position:"absolute",
                        bottom:45
                    }}>
                    <Text style={styles.label}>Tên Danh Mục</Text>
                    <TextInput
                        style={styles.input}
                        value={categoryName}
                        onChangeText={setCategoryName}
                        placeholder="Nhập tên danh mục"
                    />

                    <Text style={styles.label}>Trạng Thái</Text>
                    <Picker
                        selectedValue={categoryStatus}
                        onValueChange={(itemValue) => setCategoryStatus(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Hoạt động" value="active" />
                        <Picker.Item label="Không hoạt động" value="inactive" />
                    </Picker>

                    <Text style={styles.label}>Shop ID</Text>
                    <Picker
                        selectedValue={categoryShopId}
                        onValueChange={(itemValue) => setCategoryShopId(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Chọn danh mục" value="" />
                        <Picker.Item label="Danh mục 1" value="1" />
                        <Picker.Item label="Danh mục 2" value="2" />
                        <Picker.Item label="Danh mục 3" value="3" />
                    </Picker>

                    {/* Nút Thêm Danh Mục */}
                    <View style={{ position:"absolute",
                      top:290,
                    }}>

                    <Button
                        title="Thêm Danh Mục"
                        onPress={handleCategorySubmit}
                        color="#e74c3c"
                    />
                    </View>

                    {/* Form Product */}

                    <Text style={styles.label}>Tên Sản Phẩm</Text>

                    <TextInput
                        style={styles.input}
                        value={productName}
                        onChangeText={setProductName}
                        placeholder="Nhập tên sản phẩm"
                    />

                    <Text style={styles.label}>Mô Tả Sản Phẩm</Text>
                    <TextInput
                        style={styles.input}
                        value={productDescription}
                        onChangeText={setProductDescription}
                        placeholder="Nhập mô tả sản phẩm"
                        multiline
                    />

                    <Text style={styles.label}>Giá Sản Phẩm</Text>
                    <TextInput
                        style={styles.input}
                        value={productPrice}
                        onChangeText={setProductPrice}
                        placeholder="Nhập giá sản phẩm"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Số Lượng</Text>
                    <TextInput
                        style={styles.input}
                        value={productQuantity}
                        onChangeText={setProductQuantity}
                        placeholder="Nhập số lượng"
                        keyboardType="numeric"
                    />

                    <Text style={styles.label}>Trạng Thái Sản Phẩm</Text>
                    <Picker
                        selectedValue={productStatus}
                        onValueChange={(itemValue) => setProductStatus(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Hoạt động" value="active" />
                        <Picker.Item label="Không hoạt động" value="inactive" />
                    </Picker>

                    <Text style={styles.label}>Danh Mục Sản Phẩm</Text>
                    <Picker
                        selectedValue={productCategory}
                        onValueChange={(itemValue) => setProductCategory(itemValue)}
                        style={styles.input}
                    >
                        <Picker.Item label="Chọn danh mục" value="" />
                        {categories.map(category => (
                            <Picker.Item
                                key={category.id}
                                label={category.name}
                                value={category.id}
                            />
                        ))}
                    </Picker>
</View>
                    {/* Nút Thêm Sản Phẩm */}
                    <View style={{
                        position:"absolute",
                        top:900
                    }}>
                    <Button
                        title="Thêm Sản Phẩm"
                        onPress={handleProductSubmit}
                        color="#e74c3c"
                    />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',
        color: "#e74c3c",
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,  // Giảm khoảng cách giữa các input
        borderRadius: 5,
    },
});

export default AddProduct;
