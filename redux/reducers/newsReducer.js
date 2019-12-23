import { 
UPDATE_NEWS,
LOAD_MORE_NEWS
} from "../actions/actionTypes";

import {newsData} from './newsResponses'

let initialState = {
    news: newsData
}

export default (state = initialState, action) => {
    switch (action.type) {

    case UPDATE_NEWS:
        return { 
        ...state,
        news: action.news
        }

    case LOAD_MORE_NEWS:
        return {
        ...state,
        news: action.news
        }

    default:
        return state
    }
}

