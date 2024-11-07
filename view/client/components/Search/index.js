import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


import styles from '../../../../public/client/stylesheet/search.style';

const SearchBox = ({ placeholder }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View style={styles.searchBox}>
      <TextInput
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={onChangeSearch}
        style={styles.input}
      />
      <Button title="Tìm kiếm" onPress={() => console.log('Searching')} />
    </View>
  );
};

export default SearchBox;