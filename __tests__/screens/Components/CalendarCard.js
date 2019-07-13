
import React from 'react'
import CalendarCard from '../../../screens/Components/CalendarCard'
import { render, fireEvent } from 'react-native-testing-library';
import {LaunchData} from "../../helpers/componentData"

test('CalendarCard renders data correctly', () => {
    const {getAllByText} = render(<CalendarCard data={LaunchData}/>)
    expect(getAllByText("RandomTime")).toHaveLength(3);
    expect(getAllByText("LC 39A, Kennedy Space Center")).toHaveLength(3);
    expect(getAllByText("CRS-17")).toHaveLength(3);
});

test('CalendarCard renders default data in absensce of data', () => {
  const {getAllByText} = render(<CalendarCard/>)
  expect(getAllByText("N/A")).toHaveLength(2);
  expect(getAllByText("Launch Data Unavailable")).toHaveLength(1);
});

test('CalendarCard calls correct function when card is clicked', () => {
  const onPress = jest.fn();
  const {getAllByTestId} = render(<CalendarCard 
    CardPressed = {onPress}
    data = {LaunchData} 
  />)
  const components = getAllByTestId("CardTouch");
  fireEvent.press(components[0]);//Fire 1
  expect(onPress).toHaveBeenCalledTimes(1);//Should be called once
});

test('CalendarCard calls correct function when notification is clicked', () => {
  const onPress = jest.fn();
  const {getAllByTestId} = render(<CalendarCard 
    NotificationPressed = {onPress}
    data = {LaunchData} 
  />)
  const components = getAllByTestId("NotifyTouch");
  fireEvent.press(components[1]);//Fire 1
  expect(onPress).toHaveBeenCalledTimes(1);//Should be called once
});

