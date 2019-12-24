import React, {useEffect, useState} from "react"
import {ImageBackground, NativeModules, Platform} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components';

import { updateNews, loadMoreNews } from '../../redux/actions/newsActions';
import { updateLaunches, loadMoreLaunches } from '../../redux/actions/launchesActions';
import {CountdownTimer} from './CountdownTimer';
import {NewsCard} from '../News/NewsCard'


//! TODO: Adjust Styles to look better 
export const Home = (props) => {

  const [timezone, setTimezone] = useState('America/New_York');
  const dispatch = useDispatch();
  const nextLaunch = useSelector(store => store.launches.launches[0]);
  const newestNews = useSelector(store => store.news.news[0]);
  useEffect(() => { //On mount, update the current launch
    dispatch(updateLaunches());
    dispatch(updateNews());
    getTimezone();

    if (Platform.OS === 'android'){
      setTimeout(()=>{
        NativeModules.ImmersiveMode.enterStickyImmersiveMode();
      }, 1600)
    }
    
  }, [dispatch])

  const getTimezone = async () => {
    setTimezone(await DeviceInfo.getTimezone());
  }

    return (
        <Background
        source = {require('../../assets/images/Background.png')}
        >
          <Title>Rocket Watcher</Title>
          <TitleLine/>
          <Container>
            <Header1>Next Launch</Header1>
            <Subheader>{nextLaunch.name}</Subheader>
              <CountdownTimer
              launchTime = {nextLaunch.isostart}
              timezone = {timezone}
              />
              <Header2> Spaceflight News</Header2>
                  <NewsCard
                  news = {newestNews}
                  fullscreen = {false}
                  />
          </Container>
        </Background>
      );

    
}

const Background = styled(ImageBackground)`
flex: 1;
background-color: black;
align-content: center;
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
margin-top: 20;
margin-bottom: 15;

`

const Container = styled.View`
justify-content: center;
`
