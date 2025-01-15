import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import IntroItem from './IntroItem';

const Intro = ({ items, onItemPress }) => {

    const categories = Array.isArray(items?.result) ? items.result.slice(0, 10) : [];

    const imageList = [
        require('../../../../assets/img/fruit.png'),
        require('../../../../assets/img/vegetable.png'),
        require('../../../../assets/img/milk.png'),
        require('../../../../assets/img/snack.png'),
        require('../../../../assets/img/drink.png'),
        require('../../../../assets/img/steak.png'),
        require('../../../../assets/img/sweets.png'),
        require('../../../../assets/img/spices.png'),
        require('../../../../assets/img/fish.png'),
        require('../../../../assets/img/cereals.png'),
    ];

    const categoriesWithImages = categories.map((category, index) => ({
        ...category,
        image: imageList[index], // Thêm thuộc tính `image` từ imageList
    }));

    const itemsPerRow = 5;
    
    const rows = categoriesWithImages.reduce((acc, item, index) => {
        const rowIndex = Math.floor(index / itemsPerRow); // Chia các phần tử thành từng nhóm 5
        if (!acc[rowIndex]) acc[rowIndex] = [];
        acc[rowIndex].push(item);
        return acc;
    }, []);

    return (
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
        >
            <View style={styles.container}>
                {rows.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map(item => (
                            <IntroItem 
                                key={item.id}
                                item={item}
                                onPress={onItemPress}
                            />
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 0,
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 12,
        gap: 12, // Space between items
    }
});

export default Intro;
