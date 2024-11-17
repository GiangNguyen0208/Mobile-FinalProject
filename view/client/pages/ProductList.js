import ItemCard from '../components/ItemCard'
import styles from '../../../public/client/stylesheet/default.style';
import {
    View,
    FlatList,
    SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView

} from 'react-native';
import React, {useRef, useState} from "react";

class Item {
  constructor(id, name, price, img ,categoryId) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
    this.categoryId = categoryId;
  }
}

const stl = StyleSheet.create({
    row:{
        flexDirection:'row'
    },
    cateName:{
        fontSize:16,
        marginHorizontal:8,
    },
    selected: {
        borderBottomWidth: 1,
        borderBottomColor: '#E95322',
    },
    cateContainer:{
        height: 56,
        marginHorizontal:8,
        alignItems:'center',
    },
    border_bot:{
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        marginBottom:12,
        width:'95%',
        alignSelf:"center"
    },
    categoryTitle:{
        left: 32,
        height:32,
        fontSize:20,
        marginVertical:8,
    }
})

export default function ProductList({navigation}) {
    const data = [
        new Item(1, 'Item 1', 29.99,  require('../../../assets/favicon.png'),1),
        new Item(2, 'Item 2', 19.99,  require('../../../assets/favicon.png'),2),
        new Item(3, 'Item 3', 39.99,  require('../../../assets/favicon.png'),3),
        new Item(4, 'Item 1', 29.99,  require('../../../assets/favicon.png'),4),
        new Item(5, 'Item 2', 19.99,  require('../../../assets/favicon.png'),5),
        new Item(6, 'Item 3', 39.99,  require('../../../assets/favicon.png'),1),
        new Item(7, 'Item 1', 29.99,  require('../../../assets/favicon.png'),2),
        new Item(8, 'Item 2', 19.99,  require('../../../assets/favicon.png'),3),
        new Item(9, 'Item 3', 39.99,  require('../../../assets/favicon.png'),4),
        new Item(10, 'Item 1', 29.99,  require('../../../assets/favicon.png'),5),
    ];
    const categories = [
        { id: 1, name: 'Fruits' },
        { id: 2, name: 'Vegetables' },
        { id: 3, name: 'Dairy' },
        { id: 4, name: 'Grains' },
        { id: 5, name: 'Proteins' },
    ];

    const sortedData = data.sort((a, b) => a.categoryId - b.categoryId);

    const getCategoryNameById = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Danh mục không tồn tại';
    };

    const flatListRef = useRef(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const CategoryList = () => {
        const scrollToCategory = (categoryId) => {
            setSelectedCategoryId(categoryId)
            // Tìm vị trí sản phẩm đầu tiên của danh mục được chọn
            const index = sortedData.findIndex(item => item.categoryId === categoryId);
            if (index !== -1) {
                flatListRef.current.scrollToIndex({ index, animated: true }); // Sử dụng scrollToIndex
            }
        };
        const renderCate = ({ item }) => (
            <TouchableOpacity style={[stl.cateContainer,stl.row,selectedCategoryId === item.id && stl.selected]} onPress={() => scrollToCategory(item.id)}>
                <Text style={[stl.cateName,selectedCategoryId === item.id && {color:'#E95322',}]} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </Text>
            </TouchableOpacity>
        );

        return (
            <FlatList
                data={categories}
                renderItem={renderCate}
                keyExtractor={item => item.id.toString()}
                horizontal={true} // Đặt chiều nằm ngang
                showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
            />
        );
    };

    // Hàm render cho từng sản phẩm
    const renderItem = ({ item, index }) => {
        // Kiểm tra nếu đây là sản phẩm đầu tiên của danh mục
        const isFirstInCategory =
            index === 0 || item.categoryId !== sortedData[index - 1].categoryId;

        // Tìm danh mục tương ứng với item.categoryId
        const category = getCategoryNameById(item.categoryId);

        if (!category) {
            console.log(`Tên danh mục với id là: ${category}`);
            return null;
        }
        return (
            <View>
                {isFirstInCategory && (
                    <Text style={stl.categoryTitle}>
                        {category}
                    </Text>
                )}
                <View
                    style={[
                        stl.border_bot,
                        index === data.length - 1 && { borderBottomWidth: 0 }]}>
                    <ItemCard item={item} navigation={navigation} />
                </View>
            </View>
        );
    };

    return (
        <ScrollView >
            <View style={{borderBottomWidth: 1.5, borderBottomColor:'#f2f3f5'}}>
                <CategoryList></CategoryList>
            </View>
            <FlatList
                ref={flatListRef}
                data={sortedData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false} // Cho phép cuộn
                showsVerticalScrollIndicator={true} // Hiển thị thanh cuộn dọc
            />
        </ScrollView>
    );
}

