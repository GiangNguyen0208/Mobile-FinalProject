import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useNavigate } from 'react-router-dom';

const NavigationBottom = ({ onNavigate }) => {
  const [index, setIndex] = React.useState(0);
  const navRoutes = [
    { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline', path: '/' },
    { key: 'orders', title: 'Orders', focusedIcon: 'clipboard-list', unfocusedIcon: 'clipboard-list-outline', path: '/orders' },
    { key: 'likes', title: 'Wishlist', focusedIcon: 'heart', unfocusedIcon: 'heart-outline', path: '/likes' },
    { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline', path: '/notifications' },
    { key: 'info', title: 'MyPersonal', focusedIcon: 'account', unfocusedIcon: 'account-outline', path: '/info' },
  ];

  const handleIndexChange = (newIndex) => {
    console.log("Navigating to:", navRoutes[newIndex].path); // Debug log
    setIndex(newIndex);
    onNavigate(navRoutes[newIndex].path);
  };

  return (
    <BottomNavigation
      style={{ backgroundColor: 'white', height: 60 }}
      navigationState={{ index, routes: navRoutes }}
      onIndexChange={handleIndexChange}
      renderScene={() => null}
    >
      {navRoutes.map((route, i) => (
        <BottomNavigation.Bar
            key={route.key}
            title={route.title} 
            focusedIcon={route.focusedIcon} 
            unfocusedIcon={route.unfocusedIcon} 
        />
      ))}
    </BottomNavigation>
  );
};

export default NavigationBottom;
