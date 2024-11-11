import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import IntroItem from './IntroItem';

const Intro = ({ items, onItemPress }) => {
    // Calculate number of rows needed (5 items per row)
    const itemsPerRow = 5;
    const rows = [];
    
    for (let i = 0; i < items.length; i += itemsPerRow) {
        rows.push(items.slice(i, i + itemsPerRow));
    }

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