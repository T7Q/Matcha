import { GET_MATCH, FETCH_MORE_MATCH, SET_OFFSET, MATCH_ERROR } from '../actions/types';

const initialState = {
    match: [],
    count: 6,
    iStart: 0,
    iEnd: 0,
    matches: [],
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    // console.log("REDUCER");
    // console.log("state", state);
    // console.log("data", payload);
    switch (type) {
        case GET_MATCH:
            return {
                ...state,
                iEnd: state.iStart + state.count,
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
            return {
                ...state,
                iStart: state.iStart + state.count,
                iEnd: state.iEnd + state.count,
                loading: false,
            };
        default:
            return state;
    }
}
