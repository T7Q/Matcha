import { GET_MATCH, FETCH_MORE_MATCH, MATCH_ERROR } from '../actions/types';

const initialState = {
    match: [],
    limit: 3,
    offset: 0,
    count: 3,
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
        default:
            return state;
    }
}
