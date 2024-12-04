import { View, Text, StyleSheet } from 'react-native';
import DropDown from '../../components/DropDown/dropDown';
import NavigationTop from '../../components/Navigation/NavigationTop';
import { useState } from 'react';
import Latest from './latest';
import NearMe from './nearMe';

const WishList = () => {
  const [selectedOption, setSelectedOption] = useState('latest'); 

  const navRoutes = [
    { key: 'latest', title: 'Latest', path: '/wishlist/latest' },
    { key: 'nearMe', title: 'Near Me', path: '/wishlist/nearMe' }
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case 'latest':
        return <Latest />;
      case 'nearMe':
        return <NearMe />;
      default:
        return <Latest />;
    }
  };

  return (
    <View style={styles.container}>
      <NavigationTop onSelectOption={setSelectedOption} navRoutes={navRoutes} title="My WishList" />
      <DropDown />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, 
    backgroundColor: '#FFFFFF',
  }
});

export default WishList;