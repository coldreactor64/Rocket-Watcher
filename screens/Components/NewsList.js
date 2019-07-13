import React, { PureComponent } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import styled from 'styled-components';

export default class NewsList extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            defaultData: [{
                "_id": "0001",
                "title":"Loading News",
                "url": "https://spaceflightnewsapi.net/",
                "date_published": 1562974611
              }]
        }
    }
    _keyExtractor = (item, index) => item._id;
    
    _onPressItem = (id) => {
        let data = this.props.data.find(item => item.id === id);
        this.props.CardPressed(id);
      };
    
    _onPressNotification = (id) =>{
        this.props.NotificationPressed(id);
    }
    
    _renderItem = ({item}) => {
    const timeNow = new Date().getTime() / 1000;
    const timeDifference = timeNow - item.date_published;
    const daysDifference = Math.floor(timeDifference / 60 / 60 / 24);
    const timePosted = daysDifference > 0 ? `${daysDifference}d ago` : "Today";
    return(
        <NewsListItem
        id = {item.id}
        title = {item.title}
        time = {timePosted}
        onPressItem={this._onPressItem}
        />
    )
    }


    render() {
        return (
            <FlatList
                data={this.props.data ? this.props.data : this.state.defaultData}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }
}

class NewsListItem extends PureComponent{


    
    constructor(props){
        super(props);
    }

    _

    _onPressCard = () => {
        this.props.onPressItem(this.props.id);
    }

    _onPressNotification = () =>{
        this.props.onPressNotification(this.props.id);
    }
    
    render() {
        return (
            <CardView>
                <CardTouch onPress={this._onPressCard} testID={"CardTouch"}>
                    <Card>
                        <NewsTitle>{this.props.title}</NewsTitle>
                        <NewsTime>{this.props.time}</NewsTime>
                    </Card>
                </CardTouch>
            </CardView>
        )
    }
}



const CardView = styled.View`
flex-direction: row;
border-radius: 8;
background-color:#495CF2;
margin: 2%;
box-shadow: -6px 4px #000;
shadow-opacity: 0.6;
shadow-radius: 8.14;
elevation: 17;
`

const CardTouch = styled.TouchableOpacity`
flex: 1;
`


const Card = styled.View`
`

const NewsTitle = styled.Text`
color: #FFF;
font-size: 16px;
margin-top: 2px;
margin-left: 6px;
margin-bottom: 1px;
font-family: 'Montserrat-Bold';
`


const NewsTime = styled.Text`
color: #FFF;
font-size: 13px;
margin-left: 6px;
padding: 1px;
font-family: 'Montserrat-Regular';
`