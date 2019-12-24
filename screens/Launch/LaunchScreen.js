import React, {useEffect, useState} from "react"
import {ImageBackground} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components';

import { updateLaunches, loadMoreLaunches } from '../../redux/actions/launchesActions';
import {LaunchList} from './LaunchList'



/**
 * @function LaunchScreen - Renders Launch Screens, Base Navigation Screen
 * @param {*} props - none
 */
export const LaunchScreen = (props) => {
  const [timezone, setTimezone] = useState('America/New_York');
  const dispatch = useDispatch();
  const nextLaunch = useSelector(store => store.launches.launches);
  
  useEffect(() => { //On mount, update the current launch
    dispatch(updateLaunches());
    getTimezone();
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

            <Header1> Launch Schedule </Header1>
            <LaunchList
            launch = {nextLaunch}
            timezone = {timezone}
            />
        </Background>
      );

    
}

const Background = styled(ImageBackground)`
flex: 1;
background-color: black;
align-content: center;
`
const CardView = styled.View`
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
`

const Header1 = styled.Text`
text-align: center;
font-size: 24;
color: #fff;
font-family: 'Montserrat-Bold';
margin-top: 12px;
margin-bottom: 16px;

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
