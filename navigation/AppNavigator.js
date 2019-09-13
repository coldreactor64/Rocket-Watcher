import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Home from '../screens/Home'
import Settings from '../screens/Settings'

import LaunchDetails from '../screens/LaunchDetails'


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