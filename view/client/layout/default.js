import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import OnBoarding from '../components/Onboarding/Onboarding';
import Header from '../components/Header';
import Intro from '../components/Intro/Intro';
import NavigationBottom from '../components/Navigation/NavigationBottom';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import ListHorizontal from '../components/ListItem/ListHorizontal';
import foodData from '../partials/Food/food';
import optionData from '../partials/Option/options';

const Default = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOutlet, setShowOutlet] = useState(false);

  const navRoutes = [
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline', path: '/' },
    { key: 'orders', title: 'Orders', focusedIcon: 'clipboard-list', unfocusedIcon: 'clipboard-list-outline', path: '/orders' },
    { key: 'likes', title: 'Wishlist', focusedIcon: 'heart', unfocusedIcon: 'heart-outline', path: '/likes' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline', path: '/notifications' },
    { key: 'info', title: 'MyPersonal', focusedIcon: 'account', unfocusedIcon: 'account-outline', path: '/info' },
  ];

  const handleNavigation = (path) => {
    setShowOutlet(true);
    navigate(path);
  }

  const handleViewAllItems = () => {
    navigate('/all-items', { state: { items: foodData } });
  };

  const shouldShowNavigationBottom = !['/login', '/info'].includes(location.pathname);

  useEffect(() => {
    if (location.pathname !== '/') {
      setShowOutlet(true); // Show outlet for all paths except the default
    } else {
      setShowOutlet(false); // Hide outlet for the default path
    }
  }, [location.pathname]); // Run effect when the pathname changes

  const handleItemPress = (item) => {
    console.log('Item pressed:', item);
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showOutlet ? (
        <View style={{ flex: 10 }}>
          <Outlet />
        </View>
      ) : (
        <View style={{ flex: 4 }}>
          {/* Header */}
          {/* <Header header="Home Page" onLogin={() => navigate('/login')} /> */}
          
          <View style={styles.searchContainer}>
            <SearchBox placeholder="Search Food..." onSearch={handleSearch} />
          </View>
          {/* OnBoarding */}
          <View style={styles.onboarding}>
            <OnBoarding />
          </View>
          {/* Intro */}
          <View>
            <Intro items={optionData} onItemPress={handleItemPress} />
          </View>
          {/* List Horizontal */}
          <View>
            <View style={styles.collectionHeader}>
              <Text style={styles.collectionTitle}>Collections</Text>
              <Text 
                style={styles.viewAllText}
                // onPress={handleViewAllItems}
              >
                Views All
              </Text>
            </View>
            <ListHorizontal items={foodData} onItemPress={handleItemPress} />
          </View>

          <View>
            <Text>Welcome to the App Food!</Text>
          </View>
        </View>
      )}

      {/* Navigation Bottom */}
      <NavigationBottom onNavigate={handleNavigation} navRoutes={navRoutes} />
    </SafeAreaView>
  );
};

export default Default;
