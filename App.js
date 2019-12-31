import React, {useEffect, useState}from 'react';
import {SafeAreaView, View} from 'react-native'
import {Provider, useDispatch} from 'react-redux'
import store from './redux/store'
import AppNavigator from './navigation/AppNavigator';
import NavigationBar from 'react-native-navbar-color'
import { updateNews, loadMoreNews } from './redux/actions/newsActions';
import { updateLaunches, loadMoreLaunches } from './redux/actions/launchesActions';

import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <Provider store={store()}>
          <StartupElement/>
        </Provider>
    );
  }
}

const StartupElement = () => {
  const dispatch = useDispatch();
  
  useEffect(() => { //On mount, update the current launch
    NavigationBar.setStatusBarColor('#000000',false);
    NavigationBar.setStatusBarTheme('light', true);
    NavigationBar.setColor('#000000');
    dispatch(updateLaunches);
    dispatch(updateNews);
    SplashScreen.hide();
  }, [dispatch]);

  return (
    <SafeAreaView style={{flex:1}}>
            <AppNavigator />
    </SafeAreaView>
  );
}

