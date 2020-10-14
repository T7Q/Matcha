import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    // LOGIN_FAIL,
    UPDATE_PROFILE,
    LOGIN_SUCCESS,
    AUTH_SUCCESS,
    AUTH_FAIL,
    LOGOUT,
    MESSAGE,
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: { userId: 0, status: -1 },
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                message: null,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.tkn);
            return {
                ...state,
                user: payload.user,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: false,
            };
        case MESSAGE:
            return {
                ...state,
                message: payload,
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                user: payload.user,
            };
        case REGISTER_FAIL:
        case AUTH_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                message: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
};
