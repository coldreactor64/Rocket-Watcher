import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

export default class Button extends PureComponent {
    constructor() {
        super();
        this.state = {};
      }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
