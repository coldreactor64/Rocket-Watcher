import { LOAD_MORE_NEWS, UPDATE_NEWS } from "./actionTypes";
import axios from "axios";

/**
 * @function requestNews Gather news from API and return it
 * @param {number} -Page of news you want to get
 * @returns {JSON} - JSON list of News Articles
 */

export const requestNews = async (page) => {
    
    try {
        const newsRequest = await axios.get(
            `https://spaceflightnewsapi.net/api/v1/articles?page=${page}&limit=6`
        );
        if (newsRequest.status === 200) {
            return newsRequest.data.docs;
            
        } else {
            return [];
        }
    }
    catch(error){
        return [];
    }


};

export const updateNews = () => async dispatch => {
  const news = await requestNews(1);
  if (news.length === 0) {
    //if error null out everything
    dispatch({
      type: UPDATE_NEWS,
      news: []
    });
  } else {
    dispatch({
      type: UPDATE_NEWS,
      news: news
    });
  }
};

export const loadMoreNews = (news) => async dispatch => {
  const articles = news.length; //get Number of articles
  const page = Math.floor(articles / 6); //get number of pages
  const newArticles = await requestNews(page + 1); //request the pages + 1
  const newNews = news.concat(newArticles);
  /*Check new news if its null from an error*/

  if (newArticles.length === 0) {
    //if error null out everything
    dispatch({
      type: LOAD_MORE_NEWS,
      news: []
    });
  } else {
    dispatch({
      type: LOAD_MORE_NEWS,
      news: newNews
    });
  }
};
