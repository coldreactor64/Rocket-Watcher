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

/**
 * Return ShallowWrapper containing nodes with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val -Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */

export const findByTestAttr = (wrapper, val) =>{
    return wrapper.find(`[test-class="${val}"]`)
}
