import {
    ADD_NOTIFICATION,
    LOAD_NOTIFICATION,
    REMOVE_NOTIFICATION
} from '../actions/actionTypes'

let initialState = {
    notifications: []
}

export default (state = initialState, action) => {
    switch (action.type) {

        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: action.notifications
            }

        case LOAD_NOTIFICATION:
            return {
                ...state,
                notifications: action.notifications
            }

        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: action.notifications
            }

        default:
            return state
    }
}

