import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed

import styles from '../../../../public/client/stylesheet/search.style';

const SearchBox = ({ placeholder, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Debounce the search input to optimize performance
  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, onSearch]);

  const handleClear = () => {
    setSearchQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <View style={styles.searchBox}>
      <Ionicons name="search" size={20} color="#aaa" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={() => {
          if (onSearch) {
            onSearch(searchQuery);
          }
        }}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name="close-circle" size={20} color="#aaa" style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBox;