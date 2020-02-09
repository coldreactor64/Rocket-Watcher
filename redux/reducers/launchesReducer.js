import { 
    UPDATE_LAUNCHES,
    LOAD_MORE_LAUNCHES
    } from "../actions/actionTypes";

    import {initialLaunchData} from './launchResponses'

    let initialState = {
        launches: initialLaunchData
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