import * as React from 'react';
import { Text, Image, StyleSheet, useWindowDimensions, View } from 'react-native';

export default function OnBoardingItem({ item }) {
    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image source={{uri: item}} style={[styles.image, { width }]} />
            {/* <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },
    title: {
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
        color: "#493d8a",
        textAlign: "center",
    },
    description: {
        fontWeight: "300",
        color: "#62656b",
        textAlign: "center",
        paddingHorizontal: 64,
    }
});