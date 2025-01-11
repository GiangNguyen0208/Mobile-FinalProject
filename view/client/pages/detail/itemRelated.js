import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItemRelated = () => {
  const route = useRoute();
  const { item } = route.params || {};
  return (
    <View style={styles.container}>
      {/* Row 1 */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Image source={{uri: item.imageLink[0] }} style={[styles.image, { width }]} />
        </View>
        <View style={styles.columnMerged}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.des}</Text>
          <Text style={styles.text}>{item.price}</Text>
        </View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <View style={styles.column}>
        </View>
        <View style={styles.columnMerged}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.des}</Text>
          <Text style={styles.text}>{item.price}</Text>
        </View>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <View style={styles.column}>
          {/* Empty column */}
        </View>
        <View style={styles.columnMerged}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.des}</Text>
          <Text style={styles.text}>{item.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
    margin: 5,
    padding: 10,
  },
  columnMerged: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#90EE90',
    margin: 5,
    padding: 10,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ItemRelated;
