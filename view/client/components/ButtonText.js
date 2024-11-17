import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const ButtonText = (props) => {
    return (
        <TouchableOpacity
        >
            <Text style={{ ...styles.text, ...props.textStyle }}>{props.title}</Text>
        </TouchableOpacity>
    );
};



export default ButtonText;
