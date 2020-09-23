import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.tkn);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true,
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}
