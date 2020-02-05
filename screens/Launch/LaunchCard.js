import React from "react";
import styled from "styled-components";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, Linking } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import {useNavigation} from 'react-navigation-hooks'
import Icon from "react-native-vector-icons/FontAwesome5";

import moment from 'moment'
import tz from 'moment-timezone'

/**
 * @function LaunchCard - Interactive Launch Card with basic details
 * @param {*} props - {launch, timezone}
 * @returns {ReactNode} - Returns React Component Node
 */

//TODO: extract props from props into {launch, timezone}
export const LaunchCard = (props) => {
  //Format the time using moment.js
  let timezone = props.timezone;
  let time = moment(props.launch.isostart);
  let localTime = time.tz(timezone);
  let formattedTime = localTime.format("dddd, MMMM Do YYYY, h:mm:ss a");

  const { navigate } = useNavigation();

  const _LaunchPressed = () => {
    navigate("details",{
      data: props.launch,
      name: props.launch.name
    })
  }

  return (
    <Image
      resizeMode="cover"
      source={{ uri: props.launch.rocket.imageURL}}
      fullscreen={props.fullscreen}
    >
      <LaunchOutline
          //TODO: add a onPress = {} event to go to details
          onPress = {() => _LaunchPressed()}
      >
        {!props.launch.rocket.imageURL && (
          <PlaceHolderSymbolView>
            <Icon name="eye-slash" size={60} color="#ddd" />
          </PlaceHolderSymbolView>
        )}
        <OverlayText
          colors={["#37346800", "#222437"]}
          start={{ x: 0.0, y: 0.4 }}
          end={{ x: 0.0, y: 0.95 }}
        >
          <TextWrapper>
          <LaunchName>{props.launch.name}</LaunchName>
          <LaunchLocation>{props.launch.location.name}</LaunchLocation>
          <LaunchTime>{formattedTime}</LaunchTime>
          </TextWrapper>
        </OverlayText>
      </LaunchOutline>
    </Image>
  );
};

const LaunchOutline = styled.TouchableOpacity`
flex: 1;
`
const TextWrapper = styled.View`
  margin: 10px;
`;

const OverlayText = styled(LinearGradient)`
  flex: 1;
  justify-content: flex-end;
`;

const Image = styled.ImageBackground`
  height: 250px;
  width: 98%;
  align-self: stretch;
  margin-bottom: 8px;
  border-radius: 20px;
  overflow: hidden;
`;

const PlaceHolderSymbolView = styled.View`
  align-items: center;
  margin: 10%;
  opacity: 0.3;
  flex: 1;
  justify-content: center;
`;

const LaunchName = styled.Text`
color: #FFF;
font-size: 16px;
margin-top: 2px;
margin-left: 6px;
margin-bottom: 1px;
font-family: 'Montserrat-Bold';
`

const LaunchLocation = styled.Text`
color: #FFF;
font-size: 13px;
margin-left: 6px;
padding: 1px;
font-family: 'Montserrat-Regular';
text-align: left;
`

const LaunchTime = styled.Text`
color: #FFF;
font-size: 13px;
margin-left: 6px;
padding: 1px;
font-family: 'Montserrat-Regular';
`