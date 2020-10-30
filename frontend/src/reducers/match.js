import { GET_MATCH, MATCH_ERROR, FETCH_MORE_MATCH, CLEAR_MATCH } from '../actions/types';
import { FILTER_RESET, FILTER_UPDATE, UPDATE_LIKES, UPDATE_ERROR } from '../actions/types';

const filterBase = {
    type: '',
    min_age: 18,
    max_age: 120,
    min_distance: 0,
    max_distance: 200000,
    min_fame: 0,
    max_fame: 5,
    tags: [],
    country: [],
    order: [],
    believe_cn: true,
    believe_west: true,
    sex_orientation: '',
};

const initialState = {
    match: [],
    count: 6,
    iStart: 0,
    iEnd: 0,
    loading: true,
    error: {},
    filter: filterBase,
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MATCH:
            return {
                ...state,
                iEnd: state.iStart + state.count,
                match: payload,
                loading: false,
            };
        case FETCH_MORE_MATCH:
            return {
                ...state,
                iStart: state.iStart + state.count,
                iEnd: state.iEnd + state.count,
                loading: false,
            };
        case FILTER_RESET:
            return {
                ...state,
                filter: filterBase,
                loading: false,
            };
        case FILTER_UPDATE:
            return {
                ...state,
                filter: payload,
                loading: false,
            };
        case UPDATE_LIKES:
            return {
                ...state,
                loading: false,
            };
        case MATCH_ERROR:
        case UPDATE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_MATCH:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
