import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-dom';

const NavigationTop = ({ onSelectOption, navRoutes, title }) => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(null);
  
  const handleNavigation = (path, key) => {
    navigate(path);
    onSelectOption(key);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.optionsContainer}>
        {navRoutes.map((route) => (
          <TouchableOpacity
            key={route.key}
            onPress={() => handleNavigation(route.path, route.key)}
            style={styles.optionButton}
          >
            <Text
              style={[
                styles.buttonText,
                selectedKey === route.key && styles.selectedButtonText,
              ]}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: 'Black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    padding: 8,
  },
  buttonText: {
    color: 'black',
  },
  selectedButtonText: {
    color: 'orange',
  },
});

export default NavigationTop;