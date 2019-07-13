import React from 'react'
import NewsList from '../../../screens/Components/NewsList'
import { render, fireEvent } from 'react-native-testing-library';
import {renderNews, defaultData} from "../../helpers/Responses"

describe('News List Rendering:', () => {

    test('renders data correctly', () => {
    const {getAllByText} = render(<NewsList data={renderNews}/>)
    expect(getAllByText(renderNews[0].title)).toHaveLength(1);//Check it renders the titles
    expect(getAllByText(renderNews[4].title)).toHaveLength(1);
    });
    
    test('renders default data', () => {
        const {getAllByText} = render(<NewsList data = {[]}/>)
        expect(getAllByText(defaultData[0].title)).toHaveLength(1);
    });
    
});

describe('NewsList Actions', () => {
    test('calls correct function when card is clicked', () => {
        const onPress = jest.fn();
        const {getAllByTestId} = render(<NewsList data={renderNews}
            newsPressed = {onPress}
            />)
        const Component = getAllByTestId("Touch");
        fireEvent.press(Component[0])
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('calls correct function for reload', () => {
        const onPress = jest.fn();
        const {getByTestId} = render(<NewsList data={renderNews}
            refresh = {onPress}
            />)
        const Component = getByTestId("Flatlist");
        fireEvent(Component, 'onRefresh');
        expect(onPress).toHaveBeenCalledTimes(1);
    });

    test('calls correct function for more data', () => {
        const onPress = jest.fn();
        const {getByTestId} = render(<NewsList data={renderNews}
            loadMore = {onPress}
            />)
        const Component = getByTestId("Flatlist");
        fireEvent(Component, 'onEndReached');
        expect(onPress).toHaveBeenCalledTimes(1);
    });
});