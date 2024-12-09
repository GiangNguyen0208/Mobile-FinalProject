import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import NavigationTop from '../../components/Navigation/NavigationTop';
import Status from '../../components/Order/status';
import RecommendedProducts from '../../components/Order/recommendProducts';
import Shipping from '../../components/Order/shipping';
import History from '../../components/Order/history';
import Rating from '../../components/Order/rating';
import Draft from '../../components/Order/draft';
import DropDown from '../../components/DropDown/dropDown';

const Order = () => {
  const [selectedOption, setSelectedOption] = useState('shipping'); 

  // Initialize historyItems with sample order data
  const [historyItems, setHistoryItems] = useState([
    {
      id: '1',
      name: 'Order 1',
      price: 100,
      orderDate: '2024-10-01',
      expectedDeliveryDate: '2024-10-05',
      deliveryAddress: '123 Đường ABC, Thành phố XYZ',
      phoneNumber: '037147258',
      details: 'Detail for Order 1',
      products: [
        { productId: 'p1', productName: 'Product A', productPrice: 50, quantity: 2, image: require('../../../../assets/test1.png') },
        { productId: 'p2', productName: 'Product B', productPrice: 50, quantity: 1, image: require('../../../../assets/test1.png') },
      ],
    },
    {
      id: '2',
      name: 'Order 2',
      price: 60,
      orderDate: '2024-10-02',
      expectedDeliveryDate: '2024-10-06',
      deliveryAddress: '456 Đường DEF, Thành phố XYZ',
      phoneNumber: '037147259',
      details: 'Detail for Order 2',
      products: [
        { productId: 'p3', productName: 'Product C', productPrice: 30, quantity: 1, image: require('../../../../assets/test1.png') },
        { productId: 'p4', productName: 'Product D', productPrice: 30, quantity: 2, image: require('../../../../assets/test1.png') },
      ],
    },
  ]);

  // Sample items for other sections (can be populated similarly)
  const shippingItems = []; 
  const ratingItems = []; 
  const draftItems = []; 

  const renderSelectedComponent = () => {
    switch (selectedOption) {
      case 'shipping':
        return <Shipping items={shippingItems} />;
      case 'history':
        return <History orderItems={historyItems} />; // Pass historyItems as props
      case 'rating':
        return <Rating items={ratingItems} />;
      case 'draft':
        return <Draft items={draftItems} />;
      default:
        return null;
    }
  };

  const navRoutes = [
    { key: 'shipping', title: 'Shipping', path: '/orders/shipping' },
    { key: 'history', title: 'History', path: '/orders/history' },
    { key: 'rating', title: 'Rating', path: '/orders/rating' },
    { key: 'draft', title: 'Draft', path: '/orders/draft' },
  ];

  return (
    <View style={styles.container}>
      <NavigationTop onSelectOption={setSelectedOption} navRoutes={navRoutes} title="My Order" />
      <DropDown />
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
    paddingTop: 50
  },
});

export default Order;