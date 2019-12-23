import { 
    UPDATE_LAUNCHES,
    LOAD_MORE_LAUNCHES
    } from "../actions/actionTypes";

    import {launchData} from './launchResponses'

    let initialState = {
        launches: launchData
    }
    
    export default (state = initialState, action) => {
        switch (action.type) {
    
        case UPDATE_LAUNCHES:
            return { 
            ...state,
            launches: action.launches
            }
    
        case LOAD_MORE_LAUNCHES:
            return {
            ...state,
            launches: action.launches
            }
    
        default:
            return state
        }
    }