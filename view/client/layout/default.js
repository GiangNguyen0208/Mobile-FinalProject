import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import OnBoarding from '../components/Onboarding/Onboarding';
import Header from '../components/Header';
import Intro from '../components/Intro/Intro';
import NavigationBottom from '../components/Navigation/NavigationBottom';
import SearchBox from '../components/Search';
import styles from '../../../public/client/stylesheet/default.style';
import ListHorizontal from '../components/ListItem/ListHorizontal';
import foodData from '../partials/Food/food';
import optionData from '../partials/Option/options';
import ListVertical from '../components/ListItem/ListVertical';
import Item from '../components/ListItem/Item';
import { Outlet } from 'react-router-native';

const Default = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showOutlet, setShowOutlet] = useState(false);

  const navRoutes = [
    { key: 'home', name: 'Default', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'orders', name: 'Orders', title: 'Orders', focusedIcon: 'clipboard-list', unfocusedIcon: 'clipboard-list-outline' },
    { key: 'likes', name: 'Likes', title: 'Wishlist', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'notifications', name: 'Notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    { key: 'info', name: 'Info', title: 'My Personal', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ];

  const handleNavigation = (name) => {
    setShowOutlet(true);
    navigation.navigate(name); // Dùng navigation.navigate thay vì useNavigate
  }

  useEffect(() => {
    setShowOutlet(route.name !== 'Default'); // Hiển thị Outlet nếu không phải trang Home
  }, [route.name]);

  const handleItemPress = (item) => {
    console.log('Item pressed:', item);
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Nội dung chính */}
      {showOutlet ? (
        <ScrollView style={styles.containerScrollView}>
          <View style={{ flex: 15 }}>
            <Outlet />
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.containerScrollView}>
          <View style={styles.contentContainer}>
            {/* Search */}
            <SearchBox placeholder="Search Food..." onSearch={handleSearch} />

            {/* OnBoarding */}
            <OnBoarding />

            {/* Intro */}
            <Intro items={optionData} onItemPress={handleItemPress} />

            {/* List Horizontal */}
            <View style={styles.collectionHeader}>
              <Text style={styles.collectionTitle}>Collections</Text>
              <Text style={styles.viewAllText}>View All</Text>
            </View>

            <ListHorizontal items={foodData} onItemPress={handleItemPress} />

            {/* List Items */}
            <View style={styles.container}>
              {foodData.length > 0 ? (
                foodData.map((item) => (
                  <Item
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                  />
                ))
              ) : (
                <Text>Can't upload data from db.</Text>
              )}
            </View>
          </View>
        </ScrollView>
      )}

      {/* Navigation Bottom */}
      {/* <NavigationBottom onNavigate={handleNavigation} navRoutes={navRoutes} /> */}
    </SafeAreaView>
  );
};

export default Default;
