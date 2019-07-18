import React from 'react';
import { Linking } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import merge from 'lodash/merge';
import NewsList from './Components/NewsList';
import CalendarCard from './Components/CalendarCard';
import { updateNews, loadMoreNews } from '../redux/actions/newsActions';
import AsyncStorage from '@react-native-community/async-storage';
//import PushNotification from "react-native-push-notification";
import {
  loadNotifications,
  addNotification,
  removeNotification
} from '../redux/actions/notificationActions'
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      'launches': []
    };
  }

  async componentDidMount() {
    await AsyncStorage.removeItem("notifications")
    await this.props.updateNews();
  }

  async componentDidUpdate(prevProps, prevState) {
    let currentLaunchData = this.props.launches;
    let currentNotifications = this.props.notifications;


    //Make sure they are never undefined
    if (currentLaunchData == undefined) { 
      currentLaunchData = []
    }
    if (currentNotifications == undefined) {
      currentNotifications = []
    }

    let combinedData = [];

    //Combine the Arrays of JSON
    for (let i = 0; i < currentLaunchData.length; i++) {
      combinedData.push({
        ...currentLaunchData[i],
        ...(currentNotifications.find((itmInner) => itmInner.id === currentLaunchData[i].id))
      }
      );
    }
    //Make old statee and new state strings to compare JSON
    let previousStateString = JSON.stringify(prevState.launches)
    let combinedDataString = JSON.stringify(combinedData)
    //Only update if different
    if (previousStateString !== combinedDataString) {
      this.setState({
        'launches': combinedData
      })

    }

  }

  _CardPressed = (id) => {
  }

  _NotificationPressed = async (id) => {
    let launchData = this.state.launches.find(item => item.id === id);
    if (launchData.notification === true) {
      this.props.removeNotification(id);
    }
    else {
      this.props.addNotification(id);
    }

  }

  _NewsPressed = (id) => {
    let data = this.props.news.find(item => item._id === id);
    Linking.openURL(data.url)
  }

  _loadMoreNews = () => {
    this.props.loadMoreNews(this.props.news);
  }

  _refreshNews = () => {
    this.props.updateNews();
  }

  render() {
    return (
      <Background
        colors={["#000", "#120846", "#150F5B", "#3D24F1"]}
        locations={[0, .5, .6, 1]}>
        <Header>Rocket Watcher</Header>
        <Container>
          <Header>Launch Schedule</Header>
          <Outline>
            <Calendar
              data={this.state.launches}
              CardPressed={this._CardPressed}
              NotificationPressed={this._NotificationPressed}
            />
          </Outline>
          <Header> Spaceflight News</Header>
          <NewsView>
            <News
              newsPressed={this._NewsPressed}
              loadMore={this._loadMoreNews}
              data={this.props.news}
              refresh={this._refreshNews}
            />
          </NewsView>
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

const News = styled(NewsList)``

const NewsView = styled.View`
border-radius: 8;
flex: .5;
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
    news: state.news.news,
    notifications: state.notifications.notifications
  };
}

export default 
connect(mapStateToProps, {
    updateNews,
    loadMoreNews,
    loadNotifications,
    addNotification,
    removeNotification
  }
)(Home)





