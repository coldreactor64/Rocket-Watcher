import {LOAD_MORE_NEWS, UPDATE_NEWS} from './actionTypes'
import axios from "axios";



/**
 * @function requestNews Gather news from API and return it
 * @param {number} -Page of news you want to get
 * @returns {JSON} - JSON list of News Articles
 */

export const requestNews =  async (page) =>{

    const newsRequest = await axios.get(
        `https://spaceflightnewsapi.net/api/v1/articles?page=${page}&limit=6`
    )
        
    return newsRequest.data.docs;
}


export const updateNews = () => async dispatch => {

    const news = await requestNews(1);
    dispatch({
        type: UPDATE_NEWS,
        news: news
    })
}

export const loadMoreNews = (news) => async dispatch => {
    
const articles = news.length; //get Number of articles
const page = Math.floor(articles / 6); //get number of pages
const newArticles = await requestNews(page + 1); //request the pages + 1
const newNews = news.concat(newArticles);

dispatch({
    type:LOAD_MORE_NEWS,
    news: newNews
});


}