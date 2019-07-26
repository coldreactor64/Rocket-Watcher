/* eslint-disable*/

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {storeFactory} from '../../helpers/helperFunctions';
import {
launchGetResponse, launchData
} from '../../helpers/launchResponses'
import {updateLaunches, loadMoreLaunches} from '../../../redux/actions/launchesActions'


describe('updateNews', () => {
    test('Updates store correctly when returned 200 status code', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock
        .onGet('https://launchlibrary.net/1.4/launch/next/6?offset=0')
        .reply(200, launchGetResponse);

        return store.dispatch(updateLaunches())
        .then(()=>{
            const newState = store.getState()
            expect(newState.launches.launches).toEqual(launchData)
            //insert expected state
        })

    });
    test('Update store to [] correctly when returns 400 ', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock //mock request
        .onGet('https://launchlibrary.net/1.4/launch/next/6?offset=0')
        .reply(400, {});

        return store.dispatch(updateLaunches())
        .then(()=>{
            const newState = store.getState()
            expect(newState.news.news).toEqual([])
            //insert expected state
        })
    });
});


describe('loadMoreNews:', () => {
    
    test('Updates store correctly when returned 200 status code', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock
        .onGet('https://launchlibrary.net/1.4/launch/next/6?offset=0')
        .reply(200, launchGetResponse);

        return store.dispatch(loadMoreLaunches([]))//Load more news from nothing works the same as if there was data
        .then(()=>{
            const newState = store.getState()
            expect(newState.launches.launches).toEqual(launchData)//Match with news
        })

    });
    
    test('Update store to [] correctly when returns 400 with past news', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock //mock request
        .onGet('https://launchlibrary.net/1.4/launch/next/6?offset=0')
        .reply(400, {});

        return store.dispatch(loadMoreLaunches(launchData))
        .then(()=>{
            const newState = store.getState()
            expect(newState.launches.launches).toEqual([])
        })
    });

    test('Update store to [] correctly when returns 400 without past news', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock //mock request
        .onGet('https://launchlibrary.net/1.4/launch/next/6?offset=0')
        .reply(400, {});

        return store.dispatch(loadMoreLaunches([]))
        .then(()=>{
            const newState = store.getState()
            expect(newState.launches.launches).toEqual([])
        })
    });

});
