import React from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import NewsList from '../../../screens/Components/NewsList'
import { render, fireEvent } from 'react-native-testing-library';
import {storeFactory} from '../../helpers/helperFunctions';


describe('Updating Store', () => {
    test('Update Store correctly when returns good data', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock
        .onGet('https://spaceflightnewsapi.net/api/v1/articles?page=1&limit=6')
        .reply();

        return store.dispatch()
        .then(()=>{
            const newState = store.getState()
            //insert expected state
        })

    });
    test('Update store correctly when returns bad data', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock //mock request
        .onGet('https://spaceflightnewsapi.net/api/v1/articles?page=1&limit=6')
        .reply();

        return store.dispatch()
        .then(()=>{
            const newState = store.getState()
            //insert expected state
        })
    });
        
});

describe('User Interface', () => {
    test('NewsList renders data correctly', () => {

    });
    
    test('NewsList renders default data', () => {
    
    });
    
    test('NewsList calls correct function when card is clicked', () => {
    
    });
    
});
