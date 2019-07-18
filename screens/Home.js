import React from 'react';
import { Linking, NativeModules } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import merge from 'lodash/merge';
import NewsList from './Components/NewsList';
import LaunchList from './Components/LaunchList';
import { updateNews, loadMoreNews } from '../redux/actions/newsActions';
import { updateLaunches, loadMoreLaunches } from '../redux/actions/launchesActions';
import AsyncStorage from '@react-native-community/async-storage';


//import PushNotification from "react-native-push-notification";

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  async componentDidMount() {
    await AsyncStorage.removeItem("notifications")
    setTimeout(()=>{
      NativeModules.ImmersiveMode.enterStickyImmersiveMode();
    }, 1600)

    await this.props.updateLaunches();
    await this.props.updateNews();
  }

  async componentDidUpdate(prevProps, prevState) {

  }

  _LaunchPressed = (id) => {
    let data = this.props.launches.find(item => item.id === id);
    this.props.navigation.navigate("details",{
      data: data,
      name: data.name
    })

  }

  _NotificationPressed = async (id) => {
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

  _loadMoreLaunches = () => {
    this.props.loadMoreLaunches(this.props.launches);
  }

  _refreshLaunches = () => {
    this.props.updateLaunches();
  }



  render() {
    return (
      <Background
        colors={["#000", "#120846", "#150F5B", "#3D24F1"]}
        locations={[0, .5, .6, 1]}>
        <Title>Rocket Watcher</Title>
        <Container>
          <Header1>Launch Schedule</Header1>
          <Outline>
          <Calendar
              data={this.props.launches}
              LaunchPressed={this._LaunchPressed}
              loadMore={this._loadMoreLaunches}
              refresh={this._refreshLaunches}
              NotificationPressed={this._NotificationPressed}
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

const Background = styled(LinearGradient)`
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
    loadMoreLaunches
  }
)(Home)





