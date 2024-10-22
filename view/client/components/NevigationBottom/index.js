// import React from 'react';
import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useNavigate } from 'react-router-dom';

const NavigationBottom = ({ navRoutes }) => {
  const navigate = useNavigate();
  const [index, setIndex] = React.useState(0);

  const handleIndexChange = (newIndex) => {
    setIndex(newIndex);
    const selectedRoute = navRoutes[newIndex]; 
    if (selectedRoute) {
      navigate(selectedRoute.path);
    }
  }

  const renderScene = BottomNavigation.SceneMap({
    home: () => navRoutes.find(route => route.path === '/').element, // Use navRoutes prop
    orders: () => navRoutes.find(route => route.path === '/orders').element,
    likes: () => navRoutes.find(route => route.path === '/likes').element,
    notifications: () => navRoutes.find(route => route.path === '/notifications').element,
    info: () => navRoutes.find(route => route.path === '/info').element
  });

  return (
    <BottomNavigation
      style={{ backgroundColor: 'white', height: 60 }}
      navigationState={{ index, routes: navRoutes }}
      onIndexChange={handleIndexChange}
      renderScene={renderScene}
    />
  );
};

export default NavigationBottom;
