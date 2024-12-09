import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationBottom = ({ onNavigate, navRoutes }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentIndex = navRoutes.findIndex(route => route.path === location.pathname);
  const [index, setIndex] = React.useState(currentIndex >= 0 ? currentIndex : 0);

  const handleIndexChange = (newIndex) => {
    console.log("Navigating to:", navRoutes[newIndex].path); 
    setIndex(newIndex);
    onNavigate(navRoutes[newIndex].path);
    navigate(navRoutes[newIndex].path); // Ensure navigation happens
  };

  return (
    <BottomNavigation
      style={{ backgroundColor: '#6200EE', height: 60, flex: 1 }}
      navigationState={{ index, routes: navRoutes }}
      onIndexChange={handleIndexChange}
      renderScene={() => null} // You can implement this if needed
    >
      {navRoutes.map((route) => (
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
