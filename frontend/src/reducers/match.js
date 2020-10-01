import { GET_MATCH, FETCH_MORE_MATCH, SET_OFFSET, MATCH_ERROR } from '../actions/types';

const initialState = {
    match: [],
    limit: 100,
    offset: 0,
    count: 3,
    iStart: 0,
    iEnd: 5,
    matches: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log("REDUCER");
    switch (type) {
        case GET_MATCH:
            console.log("REDUCER case GET_MATCH");
            console.log("state", state);
            console.log("data", payload);
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
        case FETCH_MORE_MATCH:
            console.log("from Fetch", state);
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
