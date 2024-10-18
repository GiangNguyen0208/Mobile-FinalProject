import React from 'react';
import { Outlet } from 'react-router-dom';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import Intro from '../components/Intro';
import Header from '../components/Header';
import NavigationBottom from '../components/NevigationBottom';

const Default = ({ children }) => {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Header/>  
        </View>

        <Appbar.Header>
          <Appbar.Content title="Order Food" />
        </Appbar.Header>
        <View style={styles.searchContainer}>
          <SearchBox placeholder="Search Food..." />
        </View>
        <View>
          <Intro />
        </View>
        <View style={styles.content}>
          {children}
        </View> 

        <View style={{ flex: 1 }}>
          <Outlet />
          <NavigationBottom/>
        </View>
      </View>
    </>
  );
};

export default Default;
