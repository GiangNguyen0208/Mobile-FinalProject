import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import SearchBox from '../components/search';
import styles from '../../../public/client/stylesheet/default.style';

const Default = ({ children }) => {
  return (
    <>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Đặt Đồ Ăn" />
        </Appbar.Header>
        <View style={styles.searchContainer}>
          <SearchBox placeholder="Tìm kiếm món ăn..." />
        </View>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </>
    
  );
};


export default Default;