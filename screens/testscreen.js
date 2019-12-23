import React, {useEffect, useState} from "react"
import { Linking, NativeModules, Platform, ImageBackground} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components';
import NewsList from './Components/NewsList';
import LaunchList from './Components/LaunchList';

import { updateNews, loadMoreNews } from '../redux/actions/newsActions';
import { updateLaunches, loadMoreLaunches } from '../redux/actions/launchesActions';
import {addNotification, loadNotifications, removeNotification} from '../redux/actions/notificationActions'
import {CountdownTimer} from './Components/CountdownTimer';
//import {NewsCard} from './Components/NewsCard'
import NewsCard from './Components/NewNewsCard'
export const Home = (props) => {

  const [launchTimeUnix, setLaunchTimeUnix] = useState(1576988222);
  const [timezone, setTimezone] = useState('America/New_York');
  const dispatch = useDispatch();
  const nextLaunch = useSelector(store => store.launches.launches[0]);
  const newestNews = useSelector(store => store.news.news[0]);
  const newestNews2 = useSelector(store => store.news.news[1]);
  useEffect(() => { //On mount, update the current launch
    dispatch(updateLaunches());
    dispatch(updateNews());
    getTimezone();
  }, [dispatch])

  const getTimezone = async () => {
    setTimezone(await DeviceInfo.getTimezone());
  }

    return (
        <Background
        source = {require('../assets/images/Background.png')}
        >
            <CardView>
              <NewsCard
              news = {newestNews}
              fullscreen = {false}
              />
              <NewsCard
              news = {newestNews2}
              fullscreen = {false}
              />
              </CardView>
        </Background>
      );

    
}

const Background = styled(ImageBackground)`
/* flex: 1; */
background-color: black;
`

const CardView = styled.View`
flex-direction: row;
`
const Title = styled.Text`
text-align: center;
font-size: 28;
color:#fff;
font-family: 'Montserrat-Bold';
margin-bottom: 6;
margin-top: 10;
`

const TitleLine = styled.View`
  text-align: center;
  border-bottom-color: #5049C4;
  border-bottom-width: 2;
  margin-left: 60;
  margin-right: 60;
  margin-bottom: 10;
`

const Header1 = styled.Text`
text-align: center;
font-size: 24;
color: #fff;
font-family: 'Montserrat-Bold';
`

const Subheader = styled.Text`
text-align: center;
font-size: 24;
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
flex: .3;
`