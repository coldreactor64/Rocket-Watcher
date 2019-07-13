import React, { PureComponent } from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import styled from 'styled-components';
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default class LaunchList extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            defaultData: [{
                "id": "0001",
                "Location":"N/A",
                "Name": "Launch Data Unavailable",
                "Time": "N/A"
              }]
        }
    }
    _keyExtractor = (item, index) => item.id;
    
    _onPressItem = (id) => {
        let data = this.props.data.find(item => item.id === id);
        this.props.CardPressed(id);
      };
    
    _onPressNotification = (id) =>{
        this.props.NotificationPressed(id);
    }
    
    _renderItem = ({item}) => (
    <LaunchListItem
        id = {item.id}
        name = {item.Name}
        location = {item.Location}
        time = {item.Time}
        onPressItem={this._onPressItem}
        onPressNotification={this._onPressNotification}
    />
    );

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

class LaunchListItem extends PureComponent{

    constructor(props){
        super(props);
    }

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
                        <LaunchName>{this.props.name}</LaunchName>
                        <LaunchLocation>{this.props.location}</LaunchLocation>
                        <LaunchTime>{this.props.time}</LaunchTime>
                    </Card>
                </CardTouch>
                <NotifyTouch testID={"NotifyTouch"} onPress= {this._onPressNotification}>
                <Star
                name = "star-o"
                size = {26}
                color = "#fff"
                iconStyle = {{textAlign: 'right'}}
                />
                </NotifyTouch>
            </CardView>
        )
    }
}


const Star =  styled(FontAwesome)`
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
elevation: 17;
`

const CardTouch = styled.TouchableOpacity`
flex: .9;
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