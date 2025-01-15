import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Shipping from '../Order/shipping';
import History from '../Order/history';
import { useTheme } from '../../../../themes/ThemeProvider';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const NavigationTop = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Cart" // Tab mặc định là Cart (Draft)
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          height: 60,
          backgroundColor: colors.background || '#fff',
          elevation: 0,
        },
      }}
    >
      {/* Tab: Shipping */}
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

      {/* Tab: History */}
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
