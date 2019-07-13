import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RNFirebase from 'react-native-firebase';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import {reduxFirestore} from 'redux-firestore'
import reducers from './reducers/index';

const reduxFirebaseConfig = {
    userProfile: 'users', // save users profiles to 'users' collection
};

const rfConfig = {} // optional redux-firestore Config Options

export const middleware = [thunk.withExtraArgument(getFirebase)];//define the middleware
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//Compose enchancer for Redux Dev Tools

export default (initialState = { firebase: {} }) => {
    // initialize firebase
    const firebase = RNFirebase.app()

    const store = createStore(
        reducers,
        initialState,
        compose(
        reactReduxFirebase(firebase, reduxFirebaseConfig),
        reduxFirestore(firebase,rfConfig), // pass initialized react-native-firebase app instance
        composeEnhancers(applyMiddleware(...middleware)) //Apply middleware
        )
    );

return store;
};