import {TouchableOpacity, View, StyleSheet, Image, Text} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import {useState} from "react";

export default function ItemInCart({item}){
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };



    return(
            <View style={[styles.row, styles.itemContainer]}>
                <Image source={{ uri:'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0'}} style={styles.image}/>
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={[styles.priceContainer, styles.row]}>
                        <Text style={styles.price}>{item.price.toFixed(2)} đ</Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={decreaseQuantity}>
                                <AntDesign name="minussquareo" style={[styles.title, styles.alignSelf]} color="#E95322" />
                            </TouchableOpacity>
                            <Text style={{marginHorizontal:8,alignSelf:'center',fontSize:20}}>{quantity}</Text>
                            <TouchableOpacity onPress={increaseQuantity}>
                                <AntDesign name="plussquare" style={[styles.title, styles.alignSelf]} color="#E95322" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
    )
}
const styles = StyleSheet.create({
    alignSelf:{
        marginVertical:4
    },
    title:{
        fontSize: 20,
    },
    itemContainer: {
        overflow: 'hidden',
        width: '100%',
        justifyContent: 'space-between',
        height: 120,
        paddingVertical:8
    },
    info: {
        justifyContent: "space-between",
        flex: 7,
        paddingVertical: 4,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        left: 10
    },
    price: {
        fontSize: 20,
        color: '#E95322',
    },
    priceContainer: {
        marginHorizontal: 10,
        bottom: 4,
        justifyContent: "space-between",
    },
    image: {
        width: '35%',
        height: "100%",
        resizeMode: 'contain',
        marginBottom: 10,
        marginHorizontal:14,
        borderWidth:1,
        borderColor:'black'
    },
    row: {
        flexDirection: "row",
    },
    }
)
