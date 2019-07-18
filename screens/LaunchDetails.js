import React from 'react';
import { Text, View } from 'react-native';
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
    todos: state.firestore.ordered.todos
  };
}
export default connect(mapStateToProps)(LaunchDetails)



