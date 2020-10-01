import * as actionTypes from './actionTypes';
export const Auth = (state = {
    isLoading: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token') ? true : false,
    user: localStorage.getItem("creds") ? JSON.parse(localStorage.getItem("creds")) : null,
    errMess: null
}, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                user: action.creds
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: null,
                token: action.token,
                user: { ...state.user, firstname: action.firstname.slice(0, 1).toUpperCase() + action.firstname.slice(1, action.firstname.length), lastname: action.lastname.slice(0, 1).toUpperCase() + action.lastname.slice(1, action.lastname.length) }
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case actionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };
        default:
            return state
    }

}
