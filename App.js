import React from 'react';

import {Provider} from 'react-redux'
import store from './redux/store'
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount(){

  }
  render() {
    return (
    <Provider store={store()}>
      <AppNavigator/>
    </Provider>
    );
  }
}

