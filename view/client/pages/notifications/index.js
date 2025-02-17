import * as React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Notifications = () => {
  const navigation = useNavigation(); // Sử dụng từ react-navigation
  const [index, setIndex] = React.useState(0);

  const optionRoutes = [
    {
      key: 'promotions',
      title: 'Promotions',
      description: 'Latest promotions and offers',
      icon: 'star',
      path: 'Promotion', // Tên màn hình trong navigator
    },
    {
      key: 'news',
      title: 'News',
      description: 'No news yet',
      icon: 'newspaper',
      path: 'News', // Tên màn hình trong navigator
    },
  ];

  const handleIndexChange = (newIndex) => {
    const selectedRoute = optionRoutes[newIndex];
    console.log('Navigating to:', selectedRoute.path);
    setIndex(newIndex);
    navigation.navigate(selectedRoute.path); // Điều hướng theo tên màn hình
  };

  const renderOption = ({ item, index }) => (
    <View style={styles.item} key={item.key}>
      <IconButton icon={item.icon} size={24} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <IconButton
        icon="arrow-right"
        size={24}
        onPress={() => handleIndexChange(index)}
      />
    </View>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Notifications" />
        <Appbar.Action icon="cog" onPress={() => console.log('Settings pressed')} />
      </Appbar.Header>

      <View style={styles.container}>
        <FlatList
          data={optionRoutes}
          renderItem={renderOption}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.list}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 1,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default Notifications;
