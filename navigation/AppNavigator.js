import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import { Platform } from 'react-native';
import Home from '../screens/Home'
import LaunchCalendar from '../screens/LaunchCalendar'
import Settings from '../screens/Settings'
import News from '../screens/News'
import LaunchDetails from '../screens/LaunchDetails'
import {Ionicon, FontAwesomeIcon} from './components/TabBarIcons'
import Colors from '../constants/Colors'
//Each Screen that needs launch details will be put in a stack navigator with it to allow it to easily switch between that screen and details of a launch

const HomeScreen = createStackNavigator({
  homeScreen: {
    screen: Home,
    navigationOptions:{
      title: "Rocket Watcher",
      header: null,
      headerBackTitle: "Home"
    }
  },
  details: {screen: LaunchDetails}
})

HomeScreen.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Ionicon focused={focused} name='ios-rocket' />
  ),
};

const LaunchCalendarScreen = createStackNavigator({
  launchCalendar: {
    screen: LaunchCalendar,
    navigationOptions:{
      title: "Launch Calendar",
      header: null,
      headerBackTitle: "Calendar"
    }
  },
  details: {screen: LaunchDetails}
})

LaunchCalendarScreen.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <FontAwesomeIcon focused={focused} name='calendar' />
  ),
};

const NewsScreen = createStackNavigator({
  news: {
    screen: News,
    navigationOptions:{
      title: "Rocket Watcher",
      header: null,
      headerBackTitle: "Home"
    }
  }
})

NewsScreen.navigationOptions = {
  tabBarLabel: 'News',
  tabBarIcon: ({ focused }) => (
    <FontAwesomeIcon focused={focused} name='newspaper-o' />
  ),
};

const SettingsScreen = createStackNavigator({
  settings: {
    screen: Settings,
    navigationOptions:{
      title: "Rocket Watcher",
      header: null,
      headerBackTitle: "Home"
    }
  }
})

SettingsScreen.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <Ionicon focused={focused} name='ios-settings' />
  ),
};


const TabNavigator = createBottomTabNavigator({
HomeScreen,
LaunchCalendarScreen,
NewsScreen,
SettingsScreen
},
{
  tabBarOptions:{
    style:{
      backgroundColor: Colors.tabBar,
    },
    labelStyle:{
      color: Colors.tabTextColor,
      fontSize: 14,
      marginBottom: -6
    }
  }
}
);

export default createAppContainer(TabNavigator);