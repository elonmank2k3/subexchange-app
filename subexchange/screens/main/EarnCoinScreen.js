import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import ViewScreen from './sub-screens/ViewScreen';
import SubscribeScreen from './sub-screens/SubscribeScreen';
import LikeScreen from './sub-screens/LikeScreen';
import CommentScreen from './sub-screens/CommentScreen';
import { ViewIcon, SubscribeIcon, LikeIcon, CommentIcon } from '../../components/SvgIcons';
import { GlobalStyles } from '../../constants/globalStyles';

const BottomTabs = createBottomTabNavigator();

const EarnCoinScreen = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: GlobalStyles.primaryColor },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
      })}
    >
      <BottomTabs.Screen
        name="View Screen"
        component={ViewScreen}
        options={{
          tabBarLabel: 'View',
          tabBarIcon: ({ color, size }) => (
            <ViewIcon color={color} width={size} height={size}/>
          ),
        }}
      />
      <BottomTabs.Screen
        name="Subscribe Screen"
        component={SubscribeScreen}
        options={{
          tabBarLabel: 'Subscribe',
          tabBarIcon: ({ color, size }) => (
            <SubscribeIcon color={color} width={size} height={size}/>
          ),
        }}
      />
      <BottomTabs.Screen
        name="Like Screen"
        component={LikeScreen}
        options={{
          tabBarLabel: 'Like',
          tabBarIcon: ({ color, size }) => (
            <LikeIcon color={color} width={size} height={size}/>
          ),
        }}
      />
      <BottomTabs.Screen
        name="Comment Screen"
        component={CommentScreen}
        options={{
          tabBarLabel: 'Comment',
          tabBarIcon: ({ color, size }) => (
            <CommentIcon color={color} width={size} height={size}/>
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default EarnCoinScreen