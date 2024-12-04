import ItemCard from './ItemCard'
// import styles from '../../../public/client/stylesheet/default.style';
import {
    View,
    FlatList,
    SafeAreaView, StyleSheet, Text, TouchableOpacity, ScrollView

} from 'react-native';
import React, {useRef, useState} from "react";

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

export default function ProductList({navigation,foodItems ,categories}) {
    if(foodItems!=null) {

        const sortedData = foodItems.sort((a, b) => a.categoryId - b.categoryId);

        const getCategoryNameById = (id) => {
            const category = categories.find(cat => cat.id === id);
            return category ? category.name : 'Danh mục không tồn tại';
        };

        const flatListRef = useRef(null);
        const [selectedCategoryId, setSelectedCategoryId] = useState(null);

        const CategoryList = () => {

            const renderCate = ({item}) => (
                <TouchableOpacity style={[stl.cateContainer, stl.row, selectedCategoryId === item.id && stl.selected]}
                                  onPress={() => setSelectedCategoryId(categoryId)}>
                    <Text style={[stl.cateName, selectedCategoryId === item.id && {color: '#E95322',}]}
                          numberOfLines={1} ellipsizeMode="tail">
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
        const renderItem = ({item, index}) => {
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
                            index === foodItems.length - 1 && {borderBottomWidth: 0}]}>
                        <ItemCard item={item} navigation={navigation} isShopOwner={true}/>
                    </View>
                </View>
            );
        };

        return (
            <ScrollView>
                <View style={{borderBottomWidth: 1.5, borderBottomColor: '#f2f3f5'}}>
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
}

