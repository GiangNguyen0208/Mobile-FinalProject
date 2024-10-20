import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import Intro from '../components/Intro';
import Header from '../components/Header';
import NavigationBottom from '../components/NevigationBottom';
import { useNavigation } from '@react-navigation/native';


const Default = ({ children }) => {
  const navigate = useNavigation();
  const navRoutes = [
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline', path: '/' },
    { key: 'orders', title: 'Orders', focusedIcon: 'clipboard-list', unfocusedIcon: 'clipboard-list-outline', path: '/orders' },
    { key: 'likes', title: 'Wishlist', focusedIcon: 'heart', unfocusedIcon: 'heart-outline', path: '/likes' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline', path: '/notifications' },
    { key: 'info', title: 'MyPersonal', focusedIcon: 'account', unfocusedIcon: 'account-outline', path: '/info' },
  ];

  const handleLogin = () => {
    navigation.navigate('login'); // {{ edit_3 }} Handle login navigation here
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Header header="Home Page" onLogin={handleLogin} />  
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
          <NavigationBottom navRoutes={navRoutes} />
        </View>
      </View>
    </>
  );
};

export default Default;
