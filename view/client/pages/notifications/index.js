import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { Outlet, useNavigate } from 'react-router-dom';

const Notifications = () => {
    const navigation = useNavigate();
    const [index, setIndex] = React.useState(0);
    const [isOptionSelected, setIsOptionSelected] = React.useState(false);
    const optionRoutes = [
      { key: 'promotions', title: 'Promotions', description: "Latest promotions and offers", focusedIcon: 'star', unfocusedIcon: 'star-outline', icon: "star", path: 'promotions' },
      { key: 'news', title: 'News', description: "No news yet", focusedIcon: 'newspaper', unfocusedIcon: 'newspaper-outline', icon: "newspaper", path: 'news' }
    ];

    const handleIndexChange = (newIndex) => {
      const selectedRoute = optionRoutes[newIndex];
      console.log("Navigating to:", "/notifications/" + selectedRoute.path);
      setIndex(newIndex);
      setIsOptionSelected(true);
      navigation(`/notifications/${selectedRoute.path}`);
    };

    const renderOption = (route, i) => (
      <View style={styles.item} key={route.key}>
        <IconButton icon={route.icon} size={24} /> 
        <View style={styles.textContainer}>
            <Text style={styles.title}>{route.title}</Text>
            <Text style={styles.description}>{route.description}</Text> 
        </View>
        <IconButton icon="arrow-right" size={24} onPress={() => handleIndexChange(i)}/>
      </View>
    );

    return (
      <>
        <Appbar.Header>
          <Appbar.Content title={<Text>Notifications</Text>} /> 
          <Appbar.Action icon="cog" onPress={() => { /* Handle settings action */ }} /> 
        </Appbar.Header>
        <View style={styles.container}>
          {optionRoutes.map(renderOption)}
        </View>
        {isOptionSelected && (
          <View style={styles.outletContainer}>
            <Outlet />
          </View>
        )}
      </>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    fontSize: 20,
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  textContainer: {
      marginLeft: 10, 
      flex: 1, 
  },
  title: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  description: {
      fontSize: 14,
      color: 'gray',
  }
});

export default Notifications;
