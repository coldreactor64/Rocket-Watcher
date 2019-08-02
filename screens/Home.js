import React from 'react';
import { Linking, NativeModules, Platform, ImageBackground} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NewsList from './Components/NewsList';
import LaunchList from './Components/LaunchList';


import { updateNews, loadMoreNews } from '../redux/actions/newsActions';
import { updateLaunches, loadMoreLaunches } from '../redux/actions/launchesActions';
import {addNotification, loadNotifications, removeNotification} from '../redux/actions/notificationActions'
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      launches : []
    };
  }


  async componentDidMount() {
    
    await AsyncStorage.removeItem("notifications")

    if (Platform.OS === 'android'){
      setTimeout(()=>{
        NativeModules.ImmersiveMode.enterStickyImmersiveMode();
      }, 1600)
    }

    await this.props.updateLaunches();
    await this.props.updateNews();
    await this.props.loadNotifications();
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


  //Launch Functions

  //navigate to launch details if pressed
  _LaunchPressed = (id) => {

    let data = this.props.launches.find(item => item.id === id);
    
    this.props.navigation.navigate("details",{
      data: data,
      name: data.name
    })

  }

  _NotificationPressed = async (id, time) => {
    let hasNotification = this.props.notifications.find(item => item.id === id);// Find if it has a notification
    if (hasNotification) {//if it does remove it
      this.props.removeNotification(id);
    }
    else {//if it doesn't add it
      this.props.addNotification(id, time);
    }
  }

  _loadMoreLaunches = () => {
    this.props.loadMoreLaunches(this.props.launches);
  }

  _refreshLaunches = () => {
    this.props.updateLaunches();
  }

  //News functions

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




  //TODO: Preload image with componentWillMount() in Home.js
  render() {
    return (
      <Background
      source = {require('../assets/images/Background.png')}
      >
        <Title>Rocket Watcher</Title>
        <Container>
          <Header1>Launch Schedule</Header1>
          <Outline>
          <Calendar
              data={this.state.launches}
              LaunchPressed={this._LaunchPressed}
              loadMore={this._loadMoreLaunches}
              refresh={this._refreshLaunches}
              NotificationPressed={this._NotificationPressed}
              notifications = {this.props.notifications}
            />
          </Outline>
          <Header2> Spaceflight News</Header2>
          <NewsView>
            <News
              newsPressed={this._NewsPressed}
              loadMore={this._loadMoreNews}
              refresh={this._refreshNews}
              data={this.props.news}

            />
          </NewsView>
        </Container>
      </Background>
    );
  }
}

const Background = styled(ImageBackground)`
flex: 1;
`

const Calendar = styled(LaunchList)`
`

const News = styled(NewsList)``

const NewsView = styled.View`
border-radius: 8;
flex: .5;
`
const Title = styled.Text`
text-align: center;
font-size: 28;
color:#fff;
font-family: 'Montserrat-Bold';
margin-bottom: 6;
margin-top: 10;

`

const Header1 = styled.Text`
text-align: center;
font-size: 23;
color: #fff;
font-family: 'Montserrat-Bold';
margin-bottom: 10;
`

const Header2 = styled.Text`
text-align: center;
font-size: 23;
color:#fff;
font-family: 'Montserrat-Bold';
margin-bottom: 7;
margin-top: 7;
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
border-radius: 20px;
flex: .5;
`

function mapStateToProps(state) {
  return {
    news: state.news.news,
    launches: state.launches.launches,
    notifications: state.notifications.notifications
  };
}

export default 
connect(mapStateToProps, {
    updateNews,
    loadMoreNews,
    updateLaunches,
    loadMoreLaunches,
    loadNotifications,
    addNotification,
    removeNotification
  }
)(Home)





