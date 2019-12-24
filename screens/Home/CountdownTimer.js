import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";
import moment from 'moment'
import tz from 'moment-timezone'
import DeviceInfo from 'react-native-device-info';



export const CountdownTimer = (props) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [timezone, setTimezone] = useState();
  const getTimezone = async () => {
  }


  const getTimeUnix = async () => {
    let time = moment(props.launchTime);
    let localTime = time.tz(props.timezone);
    let UnixTime = localTime.unix();
    return UnixTime;
  }

  useEffect (()=>{ //everytime we have a launch update the time until launch
    if(props.launchTime !== "starttime"){
      if(timer) clearInterval(timer);
    }
    //Update the time every second
    const timer = setInterval(() => {
      updateTimeLeft();
    }, 1000);
      
    //Clear interval if we no longer are rendering this
     return function cleanup() { 
       if(timer) clearInterval(timer);
     }
   },[props.launchTime])


   const updateTimeLeft = async () => {
      let launchTimeUnix = await getTimeUnix();
      const now = new Date();
      const newTimeLeft = launchTimeUnix * 1000 - now.getTime();
      setTimeLeft(newTimeLeft);
    }


  const seconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const nullIcon = timeLeft <= 0;


  return (
    <Container>
      <UnitContainer>
        <Number>{nullIcon ? ":" : days}</Number>
        <Unit>{`day${days !== 1 ? "s" : ""}`}</Unit>
      </UnitContainer>
      <UnitContainer>
        <Number>{nullIcon ? ":" : hours % 24}</Number>
        <Unit>{`hour${minutes % 24 !== 1 ? "s" : ""}`}</Unit>
      </UnitContainer>
      <UnitContainer>
        <Number>{nullIcon ? ":" : minutes % 60}</Number>
        <Unit>{`minute${minutes % 60 !== 1 ? "s" : ""}`}</Unit>
      </UnitContainer>
      <UnitContainer>
        <Number>{nullIcon ? ":" : seconds % 60}</Number>
        <Unit>{`second${seconds % 60 !== 1 ? "s" : " "}`}</Unit>
      </UnitContainer>
    </Container>
  );
}


const Container = styled.View`
  background: #050957;
  flex-direction: row;
  justify-content: space-around;
  border-radius: 10px;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
  margin-top:10;
  padding: 15px;
`;

const UnitContainer = styled.View`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #0B1070;
  height: 70px;
  width: 60px;
  margin-left: 30px;
  margin-right: 30px;
  elevation: 23;
`;

const Unit = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #aaa;
`;

const Number = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: white;
`;

