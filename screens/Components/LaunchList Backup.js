import React, { PureComponent, Component } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import styled from 'styled-components';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DeviceInfo from 'react-native-device-info';
import moment from 'moment'
import tz from 'moment-timezone'

export default class LaunchList extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            defaultData: [{
                "id": "0001",
                "location": {
                    "name": "N/A"
                },
                "name": "Launch Data Unavailable",
                "isostart": "20190730T050000Z"
            }],
            refreshing: true
        }

    }
    _keyExtractor = (item, index) => item.id.toString();

    _onPressItem = (id) => this.props.LaunchPressed(id);

    _onPressNotification = (id, time) => this.props.NotificationPressed(id, time);



    _renderItem = ({ item }) => (
    <LaunchListItem
            id={item.id}
            name={item.name}
            location={item.location.name}
            time={item.isostart}
            onPressItem={this._onPressItem}
            onPressNotification={this._onPressNotification}
            notify = {item.notify}
        />
    );


    _loadMore = () => this.props.loadMore();


    _refresh = () => {
        this.setState({
            refreshing: true
        })

        this.props.refresh();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("updated main")
        if (prevState.refreshing === true) {
            this.setState({
                refreshing: false
            })
        }
    }

    render() {
        return (
            <FlatList
                data={this.props.data.length > 0 ? this.props.data : this.state.defaultData }
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

class LaunchListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _onPressCard = () => {
        this.props.onPressItem(this.props.id);
    }

    _onPressNotification = () => {
        console.log(this.props.notify)
        this.props.onPressNotification(this.props.id, this.props.time);
    }



    componentDidUpdate(){
        console.log(`notify: ${this.props.notify}`);
    }

    async componentDidMount(){
        let timezone = await DeviceInfo.getTimezone();
        let time = moment(this.props.time);
        let localTime = time.tz(timezone);
        let formattedTime = localTime.format("dddd, MMMM Do YYYY, h:mm:ss a");
        this.setState({
            time: formattedTime
          });
    }



    render() {
        return (
            <CardView>
                <CardTouch onPress={this._onPressCard} testID={"Touch"}>
                    <Card>
                        <LaunchName>{this.props.name}</LaunchName>
                        <LaunchLocation>{this.props.location}</LaunchLocation>
                        <LaunchTime>{this.state.time}</LaunchTime>
                    </Card>
                </CardTouch>
                <NotifyTouch testID={"NotifyTouch"} onPress={this._onPressNotification}>
                {
                        this.props.notify ? (
                            <Star
                                name="star"
                                size={26}
                                color="#F5FF00"
                                iconStyle={{ textAlign: 'right' }}
                            />) :
                            (<Star
                                name="star-o"
                                size={26}
                                color="#fff"
                                iconStyle={{ textAlign: 'right' }}
                            />)
                }
                </NotifyTouch>
            </CardView>
        )
    }
}


const Star = styled(FontAwesome)`
flex-direction: column;
flex: 1;
align-self: flex-end;
justify-content: flex-end;
text-align: right;
margin-right: 6px;
margin-top: 4px;
`


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

const NotifyTouch = styled.TouchableOpacity`
flex: .1;
`

const Card = styled.View`
`

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
