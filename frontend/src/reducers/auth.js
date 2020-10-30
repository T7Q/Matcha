import { LOGOUT, UPDATE_USER, LOAD_SOCKET, UPDATE_PATH, AUTH_FAIL } from '../actions/types';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, AUTH_SUCCESS } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: { userId: 0, status: -1 },
    socket: null,
    previousPath: '',
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
        case UPDATE_USER:
            return {
                ...state,
                user: payload,
            };
        case LOAD_SOCKET:
            return {
                ...state,
                socket: payload,
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
        case UPDATE_PATH:
            return {
                ...state,
                previousPath: payload,
            };
        default:
            return state;
    }
};
