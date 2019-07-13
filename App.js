import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, StatusBar } from 'react-native';
import {Provider} from 'react-redux'
import Screen from './Screen'
import store from './redux/store'
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
    <Provider store={store()}>
      <AppNavigator/>
    </Provider>

    );
  }
}

const styles = StyleSheet.create({

});
