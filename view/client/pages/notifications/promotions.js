import React from 'react';
import { View, Text } from 'react-native';
import ListVertical from '../../components/ListItem/ListVertical';
import ListHorizontal from '../../components/ListItem/ListHorizontal';

const Promotions = () => {
    const promotions = [
        {
            id: 1,
            image: require("../../../../assets/myMomo.jpg"), 
            title: 'Promotion 1',
            description: 'Description for promotion 1',
            date: '2023-10-01',
        },
        {
            id: 2,
            image: require("../../../../assets/myMomo.jpg"), 
            title: 'Promotion 2',
            description: 'Description for promotion 2',
            date: '2023-10-02',
        },
    ];

    console.log(promotions);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 24, margin: 10 }}>Promotions</Text>
            <ListVertical items={promotions} />
        </View>
    );
};

export default Promotions;
