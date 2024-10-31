import { View, Text } from 'react-native';
import List from "../../components/ListItem/ListVertical";

const News = () => {
    // Test data
    const news = [
        {
            id: 1,
            image: 'https://yt3.ggpht.com/1DTGWKanZjHTM_N9ieyxm2np0Dtk7gTDOXBKHuGlMEbvgmi5Mv-A47rJApN1dRBC_JEyXazBkQ=s88-c-k-c0x00ffffff-no-rj', 
            title: 'News 1',
            description: 'Description for News 1',
            date: '2023-10-01',
        },
        {
            id: 2,
            image: 'https://yt3.ggpht.com/1DTGWKanZjHTM_N9ieyxm2np0Dtk7gTDOXBKHuGlMEbvgmi5Mv-A47rJApN1dRBC_JEyXazBkQ=s88-c-k-c0x00ffffff-no-rj', 
            title: 'News 2',
            description: 'Description for News 2',
            date: '2023-10-02',
        },
    ];
    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ fontSize: 24, margin: 10 }}>News</Text>
            <List items={news} />
        </View>
    );
}

export default News;