import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItemRelated = () => {
  return (
    <View style={styles.container}>
      {/* Row 1 */}
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Main Image</Text>
        </View>
        <View style={styles.columnMerged}>
          <Text style={styles.text}>Main Content</Text>
        </View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <View style={styles.column}>
          {/* Empty column */}
        </View>
        <View style={styles.columnMerged}>
          <Text style={styles.text}>Sub Content</Text>
        </View>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <View style={styles.column}>
          {/* Empty column */}
        </View>
        <View style={styles.columnMerged}>
          <Text style={styles.text}>Sub Content</Text>
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
