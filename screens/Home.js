import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { firestoreConnect } from 'react-redux-firebase'
import LinearGradient from "react-native-linear-gradient";
import {compose} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'


import NewsList from './Components/NewsList'
import CalendarCard from './Components/CalendarCard'
import {updateNews, loadMoreNews} from '../redux/actions/newsActions'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    this.props.updateNews();
  }

  _CardPressed = (id) => {
    this.props.loadMoreNews(this.props.news.news)
    console.log(id);
  }

  _NotificationPressed = (id) => {
    console.log(id);
  }

  render() {
    return (
      <Background
      colors={["#000","#120846","#150F5B","#3D24F1"]}
      locations={[0,.5,.6,1]}>
        <Container>
            <Header>Launch Schedule</Header>
              <Outline>
                  <Calendar
                  data={this.props.launches}
                  CardPressed = {this._CardPressed}
                  NotificationPressed = {this._NotificationPressed}
                  />
              </Outline>
            <Header> Spaceflight News</Header>
            <NewsList
            />
        </Container>
      </Background>
    );
  }
}

const Background = styled(LinearGradient)`
flex: 1;
`

const Calendar = styled(CalendarCard)`
`

const Header = styled.Text`
text-align: center;
font-size: 28;
color:#fff;
font-family: 'Montserrat-Bold';
margin-bottom: 10;
margin-top: 10;
`

const Container = styled.View`
margin-top: 60px;
flex-direction: column;
align-content: flex-end;
height: 300px;
flex-grow: 1;
flex: 1;
`

const Outline = styled.View`
margin-left: 8px;
margin-right: 8px;
border-radius: 8;
background-color: #343FC1;
flex: .5;
`

function mapStateToProps(state) {
  return {
    firebase: state.firebase,
    firestore: state.firestore,
    launches: state.firestore.ordered.launches,
    news: state.news
  };
}

export default compose(
firestoreConnect(['launches']),
connect(mapStateToProps, {
  updateNews,
  loadMoreNews
})
)(Home)



const styles = StyleSheet.create({

});




