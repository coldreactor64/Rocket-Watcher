import React, {useState, useEffect} from "react";

import {FlatList, Text, ScrollView, RefreshControl} from 'react-native'
import styled from "styled-components";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import {NewsCard} from './NewsCard'
import { updateNews, loadMoreNews } from '../../redux/actions/newsActions';
import { useDispatch, useSelector } from 'react-redux';
/*
const defaultData = [{
  "_id": "5d28f8c53212d0d7323729d2",
  "title": "Loading News",
  "url": "https://spaceflightnewsapi.net/",
  "date_published": 1562974611,
  "news_site_long": "SpaceflightNewsAPI"
}];



export const NewNewsList = (props) => {
  
  const currentNews = useSelector(store => store.news.news);
  const dispatch = useDispatch(); //redux dispatch an Action
  const [refreshing, setRefreshing] = useState(true);


  
  useEffect(() => { //On mount, update the current news
    console.log(currentNews);
    dispatch(updateNews());
  }, [dispatch])

  

  const _keyExtractor = (item, index) => {
    console.log(item);
    return("5d28f8c53212d0d7323729d2")
  };
  const _loadMore = () => dispatch(loadMoreNews(currentNews))

  const _refresh = () => {
    dispatch(updateNews());
    setRefreshing(true);
  }

  const _renderItem = ({ item, index }) => {
    return (

        <Text> {item.title} </Text>
        // <NewsCard
        //     news = {item}
        //     fullscreen = {index % 3 == 0}
        // />
    )
}

  return (
      <FlatList
      //data={props.news ? props.news : defaultData}
      data = {DATA}
      keyExtractor={item => item.id}
      renderItem={_renderItem()}

      //onRefresh={_refresh()}
      //refreshing={refreshing}

      //onEndReached={_loadMore()}
      //onEndReachedThreshold={0.5}
      //initialNumToRender={6}

      testID={"Flatlist"}
  />
  );

};
*/


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const defaultData = [{
  "_id": "5d28f8c53212d0d7323729d2",
  "title": "Loading News",
  "url": "https://spaceflightnewsapi.net/",
  "date_published": 1562974611,
  "news_site_long": "SpaceflightNewsAPI"
}];


export const NewNewsList = (props) => { 


  return (
    <FlatList
    data={props.news}
    renderItem = {({item, index}) => (
      <NewsCard
      news = {item}
      fullscreen = {index % 3 == 0}
      />
    )}
    keyExtractor = {item =>item._id}
    contentContainerStyle = {{
      flexDirection: "row",
      flexWrap: "wrap"
    }}
    horizontal = {false}
    />
  )
}


//2am Note for Jeremy, you could make a seperate component which wraps both and insert that in as a whole component
//or you could switch to scroll view, i mean how many are people gonna have at one time??


export const NewsList = (props) => {


  const dispatch = useDispatch();

  const _isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom) {
        dispatch(loadMoreNews(props.news))
      }
  }

  const _refresh = () => {
    //dispatch(updateNews());
    setRefreshing(true);
  }

  const [refreshing, setRefreshing] = useState(true);

  console.log(props.news)
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