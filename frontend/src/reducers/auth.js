import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOAD_USER } from '../actions/types';

const initialState = {
    isAuthenticated: null,
    loading: true,
    user: { userId: 0, status: -1 },
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER:
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
                isAuthenticated: true,
                loading: false,
                user: payload.user,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: false,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
}
