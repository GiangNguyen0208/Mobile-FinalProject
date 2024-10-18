// import React from 'react';
import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import routes from '../../../../routes/index'; // Import the routes object

const NavigationBottom = () => {
  const [index, setIndex] = React.useState(0);
  const [navRoutes] = React.useState([
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'orders', title: 'Orders', focusedIcon: 'clipboard-list', unfocusedIcon: 'clipboard-list-outline' },
    { key: 'likes', title: 'Wishlist', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    { key: 'info', title: 'MyPersonal', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => routes.children.find(route => route.path === '/').element, // Home route
    orders: () => routes.children.find(route => route.path === '/orders').element, // Orders route
    likes: () => routes.children.find(route => route.path === '/likes').element, // Wishlists route
    notifications: () => routes.children.find(route => route.path === '/notifications').element, // Notifications route
    info: () => routes.children.find(route => route.path === '/info').element // MyPersonals route
  });

  return (
    <BottomNavigation
      style={{ backgroundColor: 'white', height: 60 }}
      navigationState={{ index, routes: navRoutes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default NavigationBottom;
