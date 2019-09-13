import newsReducer from './newsReducer'
import launchesReducer from './launchesReducer'
import notificationReducer from './notificationReducer'
import {combineReducers} from 'redux'


export default combineReducers({
    launches: launchesReducer,
    news: newsReducer,
    notifications: notificationReducer
})
