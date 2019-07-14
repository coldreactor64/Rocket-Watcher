import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import { Platform } from 'react-native';
import Home from '../screens/Home'
import Settings from '../screens/Settings'

import LaunchDetails from '../screens/LaunchDetails'
import {Ionicon, FontAwesomeIcon} from './components/TabBarIcons'
import Colors from '../constants/Colors'
//Each Screen that needs launch details will be put in a stack navigator with it to allow it to easily switch between that screen and details of a launch

const AppNavigator = createStackNavigator({
  homeScreen: {
    screen: Home,
    navigationOptions:{
      title: "Rocket Watcher",
      header: null,
      headerBackTitle: "Home"
    }
  },
  details: {screen: LaunchDetails},
  settings: {screen: Settings}
})

export default createAppContainer(AppNavigator);