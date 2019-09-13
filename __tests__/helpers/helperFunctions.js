import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../../redux/reducers';
import {middleware} from '../../redux/store.js';


/**
 * 
 * @param {object} initialState --initial state for the store
 * @function storeFactory
 * @returns {Store} -Redux Store
 */
export const storeFactory = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)
    return createStoreWithMiddleware(rootReducer, initialState);
}
