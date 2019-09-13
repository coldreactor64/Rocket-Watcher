import React from 'react';
import { Text, View, Image, ScrollView, ImageBackground } from 'react-native';
import {connect} from 'react-redux'
import Button from './Components/Button'
import styled from 'styled-components';
import LinearGradient from "react-native-linear-gradient";
import DeviceInfo from 'react-native-device-info';
import moment from 'moment'
import tz from 'moment-timezone'
class LaunchDetails extends React.Component {
  
  constructor() {
    super();
    this.state = {
      defaultData: {
        missionDescription: "Mission Description not available",
        launchLocation: "Launch Location not available"
      }

    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('name', 'Details'),
    headerStyle: {
      backgroundColor: '#000',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: "Montserrat-Bold",
      color: "#fff",
      fontSize: 16,

    },
    headerTintColor: '#fff',
  }
  };

  async componentDidMount() {
  }

  //TODO: Preload image with componentWillMount() in LaunchDetails.js
  render() {

    let launchData = this.props.navigation.getParam('data');

    let timezone = DeviceInfo.getTimezone();
    let time = moment(launchData.isostart);
    let localTime = time.tz(timezone);
    let formattedTime = localTime.format("dddd, MMMM Do YYYY, h:mm:ss a");

    return (
      <Background
      source = {require('../assets/images/Background.png')}
      >
        <DescriptionOutline>
            <DescriptionHeader>
              Mission Description:
            </DescriptionHeader>
            <LaunchDescription>
            {launchData.missions[0] != undefined ? launchData.missions[0].description : this.state.defaultData.missionDescription}
            </LaunchDescription>
        </DescriptionOutline>
        <DetailsOutline>
            <DetailsHeader>
              Launch Details:
            </DetailsHeader>
            <DetailsText>
            Launch Time: {formattedTime}
            </DetailsText>
            <DetailsText>
            Launch Location: {launchData.location.name != undefined ? launchData.location.name : this.state.defaultData.launchLocation}
            </DetailsText>
        </DetailsOutline>
      </Background>
    );
  }
}

const ScrollContainer = styled.ScrollView`
`

const Background = styled(ImageBackground)`
flex: 1;
`

const RocketImage = styled.Image`
width: 200px;
height: 200px;
border-radius: 100px;
`

const DescriptionHeader = styled.Text`
text-align: left;
font-size: 18;
color:#fff;
font-family: 'Montserrat-Bold';
margin-bottom: 10;
margin-top: 10;
margin-left: 10;
`

const DetailsHeader = styled.Text`
text-align: left;
font-size: 18;
color:#fff;
font-family: 'Montserrat-Bold';
margin-bottom: 10;
margin-top: 10;
margin-left: 10;
`


const DescriptionOutline = styled.View`
margin-left: 8px;
margin-right: 8px;
border-radius: 8;
`

const DetailsOutline = styled.View`
margin-top: 10px;
margin-left: 8px;
margin-right: 8px;
border-radius: 8;
`

const DetailsText = styled.Text`
text-align: left;
font-size: 14;
color:#fff;
font-family: 'Montserrat-Regular';
margin-bottom: 10;
margin-top: 0;
margin-left: 10;
`


const LaunchDescription = styled.Text`
text-align: left;
font-size: 14;
color:#fff;
font-family: 'Montserrat-Regular';
margin-bottom: 10;
margin-top: 0;
margin-left: 10;
`
const LaunchTime = styled.Text`
text-align: left;
font-size: 14;
color:#fff;
font-family: 'Montserrat-Regular';
margin-bottom: 10;
margin-top: 0;
margin-left: 10;
`


function mapStateToProps(state) {
  return {
    launches: state.launches.launches
  };
}

export default connect(mapStateToProps)(LaunchDetails)
