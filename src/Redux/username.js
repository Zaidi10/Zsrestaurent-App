import * as ActionTypes from './actionTypes';

export const Username = (state = { exists: false, isLoading: false, errMess: null }, actions) => {
    switch (actions.type) {
        case ActionTypes.GOT_USERNAME:
            return { ...state, isLoading: false, exists: actions.payload, errMess: null };
        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, exists: true, errMess: actions.payload };
        case ActionTypes.USERNAME_LOADING:
            return { ...state, isLoading: true, exists: true, errMess: null };
        default:
            return state;
    }

}