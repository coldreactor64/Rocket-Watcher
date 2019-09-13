/* eslint-disable*/
import React from 'react'
import LaunchList from '../../../screens/Components/LaunchList'
import { render, fireEvent } from 'react-native-testing-library';
import {launchData, defaultLaunchData} from "../../helpers/launchResponses"


import moment from 'moment'
import tz from 'moment-timezone'

describe('LaunchList Rendering:', () => {
  
    test('renders data correctly', () => {
    const {getAllByText} = render(<LaunchList data={launchData}/>)
    expect(getAllByText(launchData[0].location.name)).toHaveLength(1);//Check it renders the titles
    expect(getAllByText(launchData[4].name)).toHaveLength(1);
    });
    
    test('renders default data', () => {
        const {getAllByText} = render(<LaunchList data = {[]}/>)
        expect(getAllByText(defaultLaunchData[0].name)).toHaveLength(1);
    });
    
});

describe('LaunchList Actions', () => {
    test('calls correct function when card is clicked', () => {
        const onPress = jest.fn();
        const {getAllByTestId} = render(<LaunchList data={launchData}
            LaunchPressed = {onPress}
            />)
        const Component = getAllByTestId("Touch");
        fireEvent.press(Component[0])
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('calls correct function for reload', () => {
        const onPress = jest.fn();
        const {getByTestId} = render(<LaunchList data={launchData}
            refresh = {onPress}
            />)
        const Component = getByTestId("Flatlist");
        fireEvent(Component, 'onRefresh');
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('calls correct function for more data', () => {
        const onPress = jest.fn();
        const {getByTestId} = render(<LaunchList data={launchData}
            loadMore = {onPress}
            />)
        const Component = getByTestId("Flatlist");
        fireEvent(Component, 'onEndReached');
        expect(onPress).toHaveBeenCalledTimes(1);
    });

});