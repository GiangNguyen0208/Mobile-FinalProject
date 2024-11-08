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
import debounce from 'lodash.debounce'; // Optionally use lodash for debouncing

const Default = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOutlet, setShowOutlet] = useState(false);

  const handleNavigation = (path) => {
    setShowOutlet(true);
    navigate(path);
  }

  // handle next to "/all-items" function
  const handleViewAllItems = () => {
    navigate('/all-items', { state: { items: foodData } });
  };

  // Determine if NavigationBottom should be shown based on the current path
  const shouldShowNavigationBottom = !['/login', '/info'].includes(location.pathname);

  // Effect to reset showOutlet when navigating to certain paths
  useEffect(() => {
    // Check if the current path is not the default path
    if (location.pathname !== '/') {
      setShowOutlet(true); // Show outlet for all paths except the default
    } else {
      setShowOutlet(false); // Hide outlet for the default path
    }
  }, [location.pathname]); // Run effect when the pathname changes

  const handleItemPress = (item) => {
    console.log('Item pressed:', item);
    // Navigate or perform any action with the item
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement your search logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      {showOutlet ? (
        <View style={{ flex: 1 }}>
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
      <NavigationBottom onNavigate={handleNavigation} />
    </SafeAreaView>
  );
};

export default Default;
