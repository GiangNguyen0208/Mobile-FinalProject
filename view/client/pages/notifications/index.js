import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import NavigationBottom from '../../components/NevigationBottom';
import { Outlet } from 'react-router-dom';

const Notifications = () => {
    return (
      <>
        <Appbar.Header>
          <Appbar.Content title="Notifications" /> 
          <Appbar.Action icon="cog" onPress={() => { /* Handle settings action */ }} /> 
        </Appbar.Header>
        <View style={styles.container}>
          <View style={styles.item}>
              <IconButton icon="star" size={24} /> 
              <View style={styles.textContainer}>
                  <Text style={styles.title}>Promotions</Text>
                  <Text style={styles.description}>Latest promotions and offers</Text> 
              </View>
              <IconButton icon="arrow-right" size={24} onPress={() => { /* Handle settings action */ }}/>
          </View>
          <View style={styles.item}>
              <IconButton icon="newspaper" size={24} /> 
              <View style={styles.textContainer}>
                  <Text style={styles.title}>News</Text>
                  <Text style={styles.description}>Latest news updates</Text> 
              </View>
              <IconButton icon="arrow-right" size={24} onPress={() => { /* Handle settings action */ }}/>
          </View>
        </View>
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