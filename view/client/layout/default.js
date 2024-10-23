import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Appbar } from 'react-native-paper';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import Intro from '../components/Intro';
import Header from '../components/Header';
import NavigationBottom from '../components/NavigationBottom/index';
import { Outlet, useNavigate } from 'react-router-dom';

const Default = () => {
  const navigate = useNavigate();
  const [showOutlet, setShowOutlet] = useState(false);

  const handleNavigation = (path) => {
    setShowOutlet(true);
    navigate(path);
  }

  console.log("Rendering Outlet: ", showOutlet);
  

  return (
    <View style={styles.container}>
      
      {showOutlet ? (
        <View style={{ flex: 1 }}>
          <Outlet />
        </View>
      ) : (
        <View>
          <Header header="Home Page" onLogin={() => navigate('/login')} />
          <Appbar.Header>
            <Appbar.Content title={<Text>Order Food</Text>} />
          </Appbar.Header>
          <View style={styles.searchContainer}>
            <SearchBox placeholder="Search Food..." />
          </View>
          <View>
            <Intro />
          </View>
          <View style={styles.content}>
            <Text>Welcome to the Default Screen!</Text>
          </View>
        </View>
      )}
      <NavigationBottom onNavigate={handleNavigation} />
    </View>
  );
};

export default Default;
