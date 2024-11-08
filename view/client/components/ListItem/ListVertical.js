import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Item from './Item';

const List = ({ items }) => {
    return (
        <View style={styles.container}>
            {items.length > 0 ? (
                items.map((item) => (
                    <Item 
                        key={item.id} // Ensure each item has a unique key
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        date={item.date}
                    />
                ))
            ) : (
                <Text>No anounce.</Text> // Handle empty state
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default List;
