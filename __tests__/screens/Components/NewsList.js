/* eslint-disable*/

import React from 'react'
import NewsList from '../../../screens/Components/NewsList'
import { render, fireEvent } from 'react-native-testing-library';
import {newsData, defaultNewsData} from "../../helpers/newsResponses"
import moment from 'moment'
import tz from 'moment-timezone'

describe('News List Rendering:', () => {

    test('renders data correctly', () => {
    const {getAllByText} = render(<NewsList data={newsData}/>)
    expect(getAllByText(newsData[0].title)).toHaveLength(1);//Check it renders the titles
    expect(getAllByText(newsData[4].title)).toHaveLength(1);
    });
    
    test('renders default data', () => {
        const {getAllByText} = render(<NewsList data = {[]}/>)
        expect(getAllByText(defaultNewsData[0].title)).toHaveLength(1);
    });
    
});

describe('NewsList Actions', () => {
    test('calls correct function when card is clicked', () => {
        const onPress = jest.fn();
        const {getAllByTestId} = render(<NewsList data={newsData}
            newsPressed = {onPress}
            />)
        const Component = getAllByTestId("Touch");
        fireEvent.press(Component[0])
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('calls correct function for reload', () => {
        const onPress = jest.fn();
        const {getByTestId} = render(<NewsList data={newsData}
            refresh = {onPress}
            />)
        const Component = getByTestId("Flatlist");
        fireEvent(Component, 'onRefresh');
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('calls correct function for more data', () => {
        const onPress = jest.fn();
        const {getByTestId} = render(<NewsList data={newsData}
            loadMore = {onPress}
            />)
        const Component = getByTestId("Flatlist");
        fireEvent(Component, 'onEndReached');
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});