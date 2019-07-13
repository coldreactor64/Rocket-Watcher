import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {storeFactory} from '../../helpers/helperFunctions';
import {newsGet, news} from '../../helpers/Responses'
import {updateNews, loadMoreNews} from '../../../redux/actions/newsActions'


describe('updateNews', () => {
    test('Updates store correctly when returned 200 status code', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock
        .onGet('https://spaceflightnewsapi.net/api/v1/articles?page=1&limit=6')
        .reply(200, newsGet);

        return store.dispatch(updateNews())
        .then(()=>{
            const newState = store.getState()
            expect(newState.news.news).toEqual(news)
            //insert expected state
        })

    });
    test('Update store to [] correctly when returns 400 ', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock //mock request
        .onGet('https://spaceflightnewsapi.net/api/v1/articles?page=1&limit=6')
        .reply(400, {});

        return store.dispatch(updateNews())
        .then(()=>{
            const newState = store.getState()
            expect(newState.news.news).toEqual([])
            //insert expected state
        })
    });
});


describe('LoadMoreNews:', () => {
    
    test('Updates store correctly when returned 200 status code', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock
        .onGet('https://spaceflightnewsapi.net/api/v1/articles?page=1&limit=6')
        .reply(200, newsGet);

        return store.dispatch(loadMoreNews([]))//Load more news from nothing works the same as if there was data
        .then(()=>{
            const newState = store.getState()
            expect(newState.news.news).toEqual(news)//Match with news
        })

    });
    
    test('Update store to [] correctly when returns 400 with past news', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock //mock request
        .onGet('https://spaceflightnewsapi.net/api/v1/articles?page=2&limit=6')
        .reply(400, {});

        return store.dispatch(loadMoreNews(news))
        .then(()=>{
            const newState = store.getState()
            expect(newState.news.news).toEqual([])
        })
    });

    test('Update store to [] correctly when returns 400 without past news', () => {
        const store = storeFactory();
        var mock = new MockAdapter(axios);
        
        mock //mock request
        .onGet('https://spaceflightnewsapi.net/api/v1/articles?page=1&limit=6')
        .reply(400, {});

        return store.dispatch(loadMoreNews([]))
        .then(()=>{
            const newState = store.getState()
            expect(newState.news.news).toEqual([])

        })
    });

});
