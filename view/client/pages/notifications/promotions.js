import React from 'react';
import { View, Text } from 'react-native';
import List from '../../components/ListItem/List';

const Promotions = () => {
    const promotions = [
        {
            id: 1,
            image: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/461951690_1554402438531448_8805395653199183035_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHlNvsK_ctbZnOuKAfMkhBpKii5kqso2vwqKLmSqyja_PJrIOhRzprg0AmD_UzkyZm_nNbAb8cEo5T8anAmV0xA&_nc_ohc=tVGLTsrHz-kQ7kNvgHmsZhW&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A-QzOmEwVpe6HCKD9w-W6E-&oh=00_AYAgG3vW2rG15E8dptxhgjFAWN5jYYuj4M7FNAe5KZcC-w&oe=671EB91B', 
            title: 'Promotion 1',
            description: 'Description for promotion 1',
            date: '2023-10-01',
        },
        {
            id: 2,
            image: 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-1/461951690_1554402438531448_8805395653199183035_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHlNvsK_ctbZnOuKAfMkhBpKii5kqso2vwqKLmSqyja_PJrIOhRzprg0AmD_UzkyZm_nNbAb8cEo5T8anAmV0xA&_nc_ohc=tVGLTsrHz-kQ7kNvgHmsZhW&_nc_zt=24&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A-QzOmEwVpe6HCKD9w-W6E-&oh=00_AYAgG3vW2rG15E8dptxhgjFAWN5jYYuj4M7FNAe5KZcC-w&oe=671EB91B', 
            title: 'Promotion 2',
            description: 'Description for promotion 2',
            date: '2023-10-02',
        },
    ];

    console.log(promotions);

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 24, margin: 10 }}>Promotions</Text>
            <List items={promotions} />
        </View>
    );
};

export default Promotions;
