import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NavigationTop from '../../components/Navigation/NavigationTop';
import Status from '../../components/Order/status';
import RecommendedProducts from '../../components/Order/recommendProducts';
import Shipping from '../../components/Order/shipping';
import History from '../../components/Order/history';
import Rating from '../../components/Order/rating';
import Draft from '../../components/Order/draft';

const Order = () => {
  const [selectedOption, setSelectedOption] = useState('shipping'); 

  // Sample items for demonstration
  const shippingItems = []; 
  const historyItems = []; 
  const ratingItems = []; 
  const draftItems = []; 

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'shipping':
        return <Shipping items={shippingItems} />;
      case 'history':
        return <History items={historyItems} />;
      case 'rating':
        return <Rating items={ratingItems} />;
      case 'draft':
        return <Draft items={draftItems} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <NavigationTop onSelectOption={setSelectedOption} />
      <Status selectedOption={selectedOption} />
      {renderSelectedComponent() || <Text>No content available</Text>}
      <RecommendedProducts />
      <Text style={{ textAlign: 'center', marginTop: 20 }}>End of Order Section</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default Order;