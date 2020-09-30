import { GET_MATCH, MATCH_ERROR } from '../actions/types';

const initialState = {
    match: [],
    matches: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MATCH:
            return {
                ...state,
                match: payload,
                loading: false,
            };
        case MATCH_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}
