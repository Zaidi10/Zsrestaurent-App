import * as ActionTypes from './actionTypes';

export const Dishes = (state = { isLoading: true, errMess: null, dishes: [] }, actions) => {
    switch (actions.type) {
        case ActionTypes.DISHES_LOADING:
            return { ...state, isLoading: true, errMess: null, dishes: [] };
        case ActionTypes.DISHES_FAILED:
            return { ...state, isLoading: false, errMess: actions.payload, dishes: [] };
        case ActionTypes.ADD_DISHES:
            return { ...state, isLoading: false, errMess: null, dishes: actions.payload };
        default:
            return state;
    }

}