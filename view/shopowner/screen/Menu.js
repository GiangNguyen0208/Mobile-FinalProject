import {TouchableOpacity, View, StyleSheet, FlatList, Text, Modal} from "react-native";
import React, {useState} from "react";
import ItemCard from "../../client/components/ListItem/ItemCard";
import CartIcon from "../../client/components/Cart/CartIcon";
import ProductList from "./ProductList";
import AntDesign from '@expo/vector-icons/AntDesign';


class Item {
    constructor(id, name, price, img ,categoryId) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.categoryId = categoryId;
    }
}

const Menu = ({navigation}) => {
    const [selectedCategory, setSelectedCategory] = useState('food');

    const foodItems = [
        new Item(1, 'Item 1', 29.99,  require('../../../assets/img/order-food.png'),1),
        new Item(2, 'Item 2', 19.99,  require('../../../assets/img/order-food.png'),2),
        new Item(3, 'Item 3', 39.99,  require('../../../assets/img/order-food.png'),3),
        new Item(4, 'Item 1', 29.99,  require('../../../assets/img/order-food.png'),1),
        new Item(5, 'Item 2', 19.99,  require('../../../assets/img/order-food.png'),2),
        new Item(6, 'Item 3', 39.99,  require('../../../assets/img/order-food.png'),3),
        new Item(7, 'Item 1', 29.99,  require('../../../assets/img/order-food.png'),1),
        new Item(8, 'Item 2', 19.99,  require('../../../assets/img/order-food.png'),2),
        new Item(9, 'Item 3', 39.99,  require('../../../assets/img/order-food.png'),3),
        new Item(10, 'Item 1', 29.99,  require('../../../assets/img/order-food.png'),1),
    ];

    const categories = [
        { id: 1, name: 'Bánh' },
        { id: 2, name: 'Nước' },
        { id: 3, name: 'Khác' },
    ];

    const renderFood = () => (
        // <View style={styles.item}>
        //     <ItemCard item={item} navigation={navigation} isShopOwner={true}/>
        // </View>
        <ProductList navigation={navigation} foodItems={foodItems} categories={categories}> isShopOwner={true}</ProductList>
    );

    const renderCategory = () => {
        const renCate = ({item}) => (
            <TouchableOpacity style={[styles.cateContainer, styles.row, ]}>
                <Text style={[styles.cateName, ]}
                    numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                </Text>
                <AntDesign name="right" size={24} color="black" />
            </TouchableOpacity>
        );

        return (
            <FlatList
                data={categories}
                renderItem={renCate}
                keyExtractor={item => item.id.toString()}
            />
        );
    };

    return (
        <View>
            <View style={[styles.row,{backgroundColor:'white'}]}>
                <TouchableOpacity style={[styles.funcContainer,styles.row,selectedCategory === 'food' && styles.selected]} onPress={()=>setSelectedCategory('food')}>
                    <Text style={[styles.funcName,selectedCategory === 'food' && {color:'#E95322',}]} numberOfLines={1} ellipsizeMode="tail">
                        Món
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.funcContainer,styles.row,selectedCategory === 'category' && styles.selected]} onPress={()=>setSelectedCategory('category')}>
                    <Text style={[styles.funcName,selectedCategory === 'category' && {color:'#E95322',}]} numberOfLines={1} ellipsizeMode="tail">
                        Danh mục
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={selectedCategory === 'food' ? foodItems : categories}
                renderItem={selectedCategory === 'food' ? renderFood : renderCategory}
                keyExtractor={(item) => item.id.toString()}
                style={{height:'100%'}}
                contentContainerStyle={{ paddingBottom: 120 }}
            />
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.addFoodBtn}>
                        <Text style={{color:"white",fontSize:16,textAlign:'center'}}>Thêm món</Text>
                </TouchableOpacity>
            </View>
        </View>
    )};


const styles = StyleSheet.create({
    row:{
        flexDirection: 'row',

    },
    funcContainer:{
        height: 56,
        marginHorizontal:8,
        alignItems:'center',
    },
    funcName:{
        fontSize:16,
        paddingHorizontal: 70,
    },
    selected:{
        borderBottomWidth: 1,
        borderBottomColor: '#E95322',
    },
    item:{
        backgroundColor:'white',
        borderBottomWidth:0.5,
    },
    btnContainer: {
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        elevation: 5,
        height: 120,
        position:'absolute',
        bottom:0,
    },
    addFoodBtn:{
        width:'95%',
        paddingVertical:8,
        marginVertical: 14,
        backgroundColor: '#E95322',
        borderRadius:8,
    },
})
export default Menu;
