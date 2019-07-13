
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import {combineReducers} from 'redux'


export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
})
