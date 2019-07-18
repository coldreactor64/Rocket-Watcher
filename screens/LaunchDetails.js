import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';

import {compose} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components';

class LaunchDetails extends React.Component {
  
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {

  }

  render() {
    return (
    <View>
      <Text>Launch Details</Text>
    </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    firebase: state.firebase,
    firestore: state.firestore,
    todos: state.firestore.ordered.todos
  };
}
export default connect(mapStateToProps)(LaunchDetails)



