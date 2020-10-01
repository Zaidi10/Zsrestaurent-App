import * as ActionTypes from './actionTypes';

export const Errors = (state = { isError: false }, actions) => {
    switch (actions.type) {
        case ActionTypes.SHOW_ERROR:
            return ({ ...state, isError: true })
        case ActionTypes.HIDE_ERROR:
            return ({ ...state, isError: false })
        default:
            return state;
    }

}