import React from 'react';
import {SafeAreaView} from 'react-native'
import {Provider} from 'react-redux'
import store from './redux/store'
import AppNavigator from './navigation/AppNavigator';
import NavigationBar from 'react-native-navbar-color'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount(){
    NavigationBar.setStatusBarColor('#000000',false)
    NavigationBar.setStatusBarTheme('light',true)
    NavigationBar.setColor('#000000')
  }
  render() {
    return (
    <SafeAreaView style = {{flex: 1}}>
      <Provider store={store()}>
        <AppNavigator/>
      </Provider>
    </SafeAreaView>
    );
  }
}

