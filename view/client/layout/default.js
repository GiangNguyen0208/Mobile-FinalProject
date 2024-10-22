import React from 'react';
import {Button, View} from 'react-native';
import { Appbar } from 'react-native-paper';
import SearchBox from '../components/search';
import styles from '../../../public/client/stylesheet/default.style';
import ProductList from "../pages/ProductList";
const Default = ({ navigation }) => {
  const goShop=()=>{
    navigation.navigate('Shop')
  }
  return (
    <>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Đặt Đồ Ăn" />
        </Appbar.Header>
        <View style={styles.searchContainer}>
          <SearchBox placeholder="Tìm kiếm món ăn..." />
        </View>
        <View>
          <Button title={"to go shop"} onPress={goShop}></Button>
        </View>
        <View style={styles.content}>
          <ProductList navigation={navigation} ></ProductList>
        </View>

      </View>
    </>

  );
};


export default Default;
