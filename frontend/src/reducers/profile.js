import { CREATE_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_PROFILE:
            localStorage.setItem('token', payload.tkn);
            return {
                ...state,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}
