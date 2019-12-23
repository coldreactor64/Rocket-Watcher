import React from "react";
import styled from "styled-components";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export const NewsCard = (props) => {
    
  const timeNow = new Date().getTime() / 1000;
  const timeDifference = timeNow - props.news.date_published;
  const daysDifference = Math.floor(timeDifference / 60 / 60 / 24);
  const timePosted = daysDifference > 0 ? `${daysDifference}d ago` : "Today";


  return (
    <Image
      resizeMode="cover"
      source={{ uri: props.news.featured_image }}
      fullscreen={props.fullscreen}
    >
      <NewsOutline
        onPress={() => Linking.openURL(props.news.url)}
      >
        {!props.news.featured_image && (
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
            <Title>{props.news.title}</Title>
            <NewsSite>
              {props.news.news_site_long} - {timePosted}
            </NewsSite>
          </TextWrapper>
        </OverlayText>
      </NewsOutline>
    </Image>
  );
};

const NewsOutline = styled.TouchableOpacity`
flex: 1;
`

const Title = styled.Text`
  color: white;
  font-weight: bold;
`;

const NewsSite = styled.Text`
  color: white;
  margin-top: 2px;
  font-size: 11px;
`;

const TextWrapper = styled.View`
  margin: 10px;
`;

const OverlayText = styled(LinearGradient)`
  flex: 1;
  justify-content: flex-end;
`;

const Image = styled.ImageBackground`
  height: 250px;
  width: 100%;
  align-self: stretch;
`;

const PlaceHolderSymbolView = styled.View`
  align-items: center;
  margin: 10%;
  opacity: 0.3;
  flex: 1;
  justify-content: center;
`;


