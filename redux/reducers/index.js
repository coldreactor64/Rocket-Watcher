
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import newsReducer from './newsReducer'
import {combineReducers} from 'redux'


export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    news: newsReducer
})
