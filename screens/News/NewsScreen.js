import React, {useEffect, useState} from "react"
import {ImageBackground} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components';
import { updateNews, loadMoreNews } from '../../redux/actions/newsActions';
import { updateLaunches, loadMoreLaunches } from '../../redux/actions/launchesActions';
import {NewNewsList, NewsList} from './NewNewsList'

/**
 * @function NewsScreen - Base Screen to show Spaceflight News
 * @param {*} props -None
 */

export const NewsScreen = (props) => {

  const [timezone, setTimezone] = useState('America/New_York');
  const dispatch = useDispatch();
  const currentNews = useSelector(store => store.news.news);

  useEffect(() => { //On mount, update the current launch
    dispatch(updateNews());
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
            <Header1> Spaceflight News </Header1>
           <NewsList
              news = {currentNews}
              />
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
`

const Header1 = styled.Text`
text-align: center;
font-size: 24;
color: #fff;
font-family: 'Montserrat-Bold';
margin-top: 12px;
margin-bottom: 16px;

`

