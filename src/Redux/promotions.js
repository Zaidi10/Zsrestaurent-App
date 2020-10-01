import * as ActionTypes from './actionTypes';


export const Promotions = (state = { isLoading: true, errMess: null, promotions: [] }, actions) => {
    switch (actions.type) {
        case ActionTypes.PROMOS_LOADING:
            return { ...state, isLoading: true, errMess: null, promotions: [] }

        case ActionTypes.PROMOS_FAILED:
            return { ...state, isLoading: false, errMess: actions.payload, promotions: [] }

        case ActionTypes.ADD_PROMOS:
            return { ...state, isLoading: false, errMess: null, promotions: actions.payload }
        default:
            return state;
    }

}