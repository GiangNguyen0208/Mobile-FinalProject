import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Text, View} from "react-native";
import React from "react";

const Rating = ({ rating }) => {
    const stars = [];
    const starRender = (rating) => {
        const fullStars = Math.floor(rating); // Số sao đầy đủ
        const halfStar = rating % 1 !== 0 ? 1 : 0; // Số nửa sao
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <FontAwesome key={`star-${i}`} name="star" size={20} color="#FFD12F" />
            );
        }
        if(halfStar){
            for (let i = 0; i < halfStar; i++) {
                stars.push(
                    <FontAwesome key={`star-half-full-${i}`} name="star-half-full" size={20} color="#FFD12F" />
                );}
        }
        const remainingStars = 5 - fullStars - halfStar; // Tính số sao rỗng
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <FontAwesome key={`star-o-${i}`} name="star-o" size={20} color="#FFD12F" />
            );
        }
    };
    starRender(rating);
    return (
        <View style={{flexDirection:'row',margin:10,}}>
            <Text >{stars}</Text>
        </View>
    );
};
export default Rating;
