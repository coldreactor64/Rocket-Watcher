import React, {useState, useEffect} from "react";
import {FlatList, Text, ScrollView, RefreshControl} from 'react-native'
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";
import {NewsCard} from './NewsCard'
import { updateNews, loadMoreNews } from '../../redux/actions/newsActions';
import { useDispatch, useSelector } from 'react-redux';

/**
 * @function NewsList - ScrollView component that renders NewsCards
 * @param {*} props - {news}
 */

export const NewsList = (props) => {

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(true);

  const _isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom) {
        dispatch(loadMoreNews(props.news))
      }
  }

  const _refresh = () => {
    ///dispatch(updateNews());
    setRefreshing(true);
  }

  useEffect(()=> {
    setRefreshing(false);
  }, [props.news])

  return (

      <Scroll
        onScroll = {({nativeEvent}) => _isCloseToBottom(nativeEvent)}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        <NewsView>
        {props.news.map((item, index) => {
          return(
            <NewsCard
              key = {item._id}
              news={item}
              fullscreen = {true}
            />
          )
        })}
        </NewsView>

      </Scroll>

  );
}


const Scroll = styled.ScrollView `

`

const NewsView = styled.View``