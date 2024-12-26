import {View, Text, Modal, TouchableOpacity, StyleSheet, Animated, Button, FlatList} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
const BackBtn=()=>{
    return(
        <View>
            <TouchableOpacity>
                <AntDesign name="arrowleft" size={24} color="black" />

            </TouchableOpacity>
        </View>
    )
}
export default BackBtn;
