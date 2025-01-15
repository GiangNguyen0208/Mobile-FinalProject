import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Shipping from '../Order/shipping';
import History from '../Order/history';
import { useTheme } from '../../../../themes/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const NavigationTop = () => {
  const navigation = useNavigation();
  const colors = { primary: '#000', text: '#777', background: '#fff' }; // Sử dụng giá trị mặc định

  return (
    <Tab.Navigator
      initialRouteName="Shipping"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: 60,
          backgroundColor: colors.background,
          elevation: 0,
        },
      }}
    >
      <Tab.Screen
        name="Shipping"
        component={Shipping}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome5
                name="shipping-fast"
                size={24}
                color={focused ? colors.primary : colors.text}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesome5
                name="history"
                size={24}
                color={focused ? colors.primary : colors.text}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationTop;
