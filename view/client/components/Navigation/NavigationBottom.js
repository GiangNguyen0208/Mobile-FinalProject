import { View, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { COLORS } from '../../../../constants'

import { useTheme } from '../../../../themes/ThemeProvider';
import Default from '../../layout/default'
import Order from '../../pages/order'
import WishList from '../../pages/wishlist'
import Notifications from '../../pages/notifications'
import Info from '../../pages/Info/User'

const Tab = createBottomTabNavigator()

const BottomTabNavigation = () => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                elevation: 0,
                height: 60,
                backgroundColor: "#fff",
              },
        }}>
            <Tab.Screen
                name="Default"
                component={Default}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (<View><MaterialCommunityIcons name="home-variant" size={24} color="black" /></View>)
                    },
                }}
            />

            <Tab.Screen
                name="Orders"
                component={Order}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View><Entypo name="shopping-cart" size={24} color="black" /></View>)
                    },
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons name="notifications" size={24} color="black" />
                            </View>
                        )
                    },
                }}
            />
            <Tab.Screen
                name="Info"
                component={Info}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <MaterialCommunityIcons name="account-box" size={24} color="black" />
                            </View>
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation