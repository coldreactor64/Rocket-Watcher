import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import {LaunchCard} from './LaunchCard'
import { updateLaunches, loadMoreLaunches } from '../../redux/actions/launchesActions';
/**
 * @function LaunchList - Launch List Scroll View component (renders list of Launch Cards)
 * @param {*} props - Props {launch, timezone}
 * @returns {ReactNode} - Returns React Components
 */

/*
 TODO: extract from props expected props to be more transparent in docs
 for example put {launch, timezone} instead of props
*/
export const LaunchList = (props) => {

    //TODO: Fix Refreshing, not needed for now
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(true);
  
    const _isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
      const paddingToBottom = 20;
      if (layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom) {
          dispatch(loadMoreLaunches(props.launch))
        }
    }
  
    useEffect(()=> {
      setRefreshing(false);
    }, [props.launch])
  
    return (
  
        <Scroll
          onScroll = {({nativeEvent}) => _isCloseToBottom(nativeEvent)}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around"
          }}
        >
          <LaunchView>
          {props.launch.map((item, index) => {
            return(
              <LaunchCard
                key = {item.id}
                launch={item}
                timezone = {props.timezone}
              />
            )
          })}
          </LaunchView>
  
        </Scroll>
  
    );
  }
  
  
  const Scroll = styled.ScrollView ``

  const LaunchView = styled.View``