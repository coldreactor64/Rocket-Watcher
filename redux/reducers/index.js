import newsReducer from './newsReducer'
import notificationReducer from './notificationReducer'
import {combineReducers} from 'redux'


export default combineReducers({
    news: newsReducer,
    notifications: notificationReducer
})
