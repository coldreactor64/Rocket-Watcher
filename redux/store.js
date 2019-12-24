import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
export const middleware = [thunk];//define the middleware
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//Compose enchancer for Redux Dev Tools
import { composeWithDevTools } from 'redux-devtools-extension';

export default (initialState = { }) => {

    const store = createStore(
        reducers,
        initialState,

        composeWithDevTools(applyMiddleware(...middleware)) //Apply middleware
    );

return store;
};