import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Item from './Item';

const ListVertical = ({ items }) => {
    return (
        <View style={styles.container}>
            {items.length > 0 ? (
                items.map((item) => (
                    <Item 
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                        date={item.date}
                    />
                ))
            ) : (
                <Text>No announcements.</Text>
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

export default ListVertical;
