import React, { PureComponent } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import styled from 'styled-components';


export default class NewsList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultData: [{
                "_id": "5d28f8c53212d0d7323729d2",
                "title": "Loading News",
                "url": "https://spaceflightnewsapi.net/",
                "date_published": 1562974611,
                "news_site_long": "SpaceflightNewsAPI"
            }],
            refreshing: true
        }
    }


    _keyExtractor = (item, index) => item._id;

    _onPressItem = (id) => {
        this.props.newsPressed(id);
    };

    _loadMore = () => this.props.loadMore();


    _refresh = () => {
        this.setState({
            refreshing: true
        })

        this.props.refresh();
    }



    _renderItem = ({ item }) => {
        const timeNow = new Date().getTime() / 1000;
        const timeDifference = timeNow - item.date_published;
        const daysDifference = Math.floor(timeDifference / 60 / 60 / 24);
        const timePosted = daysDifference > 0 ? `${daysDifference}d ago` : "Today";

        return (
            <NewsListItem
                id={item._id}
                title={item.title}
                time={timePosted}
                site={item.news_site_long}
                onPressItem={this._onPressItem}
            />
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.refreshing === true) {
            this.setState({
                refreshing: false
            })
        }
    }

    render() {
        return (
            <FlatList
                data={this.props.data.length > 0 ? this.props.data : this.state.defaultData}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}

                onRefresh={this._refresh}
                refreshing={this.state.refreshing}

                onEndReached={this._loadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={6}

                testID={"Flatlist"}
            />
        )
    }
}

class NewsListItem extends PureComponent {



    constructor(props) {
        super(props);
    }

    _onPressCard = () => {
        this.props.onPressItem(this.props.id);
    }

    render() {
        return (
            <CardView>
                <CardTouch testID={"Touch"} onPress={this._onPressCard}>
                    <Card>
                        <NewsTitle>{this.props.title}</NewsTitle>
                        <NewsTime>{this.props.site} - {this.props.time}</NewsTime>
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
elevation: 20;
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
margin-right: 6px;
margin-bottom: 10px;
text-align: center;
font-family: 'Montserrat-Regular';
`


const NewsTime = styled.Text`
color: #FFF;
font-size: 12px;
margin-left: 6px;
margin-right: 6px;
padding: 1px;
text-align: center;
font-family: 'Montserrat-Bold';
`