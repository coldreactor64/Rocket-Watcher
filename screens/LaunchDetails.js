import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import { firestoreConnect } from 'react-redux-firebase'
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
export default compose(
  firestoreConnect(['launches']),
  connect(mapStateToProps))(LaunchDetails)



