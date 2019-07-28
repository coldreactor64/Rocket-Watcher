import React, { PureComponent } from 'react'

import { Text, TouchableOpacity, Button } from 'react-native'
import styled from 'styled-components';


export default class CustomButton extends PureComponent {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <ButtonOutline
            title = {this.props.title}
            />
        )
    }
}

const ButtonOutline = styled(Button)`
border-radius: 10px;
border-width: 1px;
background-color: #FF6A00;
overflow: hidden;
margin: 10px;
`

const Label = styled.Text`
text-align: center;
padding: 10px;
`