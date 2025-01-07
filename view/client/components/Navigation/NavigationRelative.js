import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RelatedFoodScreen from '../../pages/detail/foodRelated';  // Đảm bảo import đúng component
import RelatedShopScreen from '../../pages/detail/shopRelated';  // Đảm bảo import đúng component
import { useTheme } from '../../../../themes/ThemeProvider';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const NavigationRelative = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="RelatedFoodScreen"  // Màn hình mặc định là RelatedFoodScreen
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
      <Tab.Screen
        name="RelatedFoodScreen"
        component={RelatedFoodScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons name="fast-food" size={24} color="black" />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="RelatedShopScreen"
        component={RelatedShopScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo name="shop" size={24} color="black" />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationRelative;
