import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Platform } from 'react-native';
import {Home} from '../screens/Home/Home'
import {LaunchScreen} from '../screens/Launch/LaunchScreen'
import Settings from '../screens/Settings'
import {NewsScreen as News} from '../screens/News/NewsScreen'
import LaunchDetails from '../screens/Launch/LaunchDetails'
import {Ionicon, FontAwesomeIcon} from './components/TabBarIcons'

const HomeScreen = createStackNavigator({
  homeScreen: {
    screen: Home,
    navigationOptions:{
      title: "Rocket Watcher",
      header: null,
      headerBackTitle: "Home"
    }
  },
  details: {screen: Home}
})

HomeScreen.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Ionicon focused={focused} name='ios-rocket' />
  ),
};

const LaunchCalendarScreen = createStackNavigator({
  launchCalendar: {
    screen: LaunchScreen,
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
      backgroundColor: '#3D24F1',
      borderColor: '#3D24F1'
    },
    labelStyle:{
      color: '#ff0000',
      fontSize: 14,
      marginBottom: 0
    }
  }
}
);

export default createAppContainer(TabNavigator);