import * as actionTypes from './actionTypes';

export const Favorites = (state = {
    isLoading: true,
    errMess: null,
    favorites: null
}, action) => {
    switch (action.type) {
        case actionTypes.ADD_FAVORITES:
            return { ...state, isLoading: false, errMesWWs: null, favorites: action.payload };

        case actionTypes.FAVORITES_LOADING:
            return { ...state, isLoading: true, errMess: null, favorites: null };

        case actionTypes.FAVORITES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, favorites: null };

        default:
            return state;
    }
}