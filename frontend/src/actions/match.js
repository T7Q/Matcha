import axios from 'axios';
import { GET_MATCH, MATCH_ERROR, FETCH_MORE_MATCH, GET_FILTER_MATCH, FILTER_UPDATE, FILTER_RESET } from './types';
import store from '../store';
// const route = `/match/recommend`;

// Get current user profile
export const getRecommend = (route, filterIsOn) => async dispatch => {
    // let route = '';
    // console.log("actions PATH", route);
    // console.log("filterIsOn", filterIsOn);
    // console.log("ACTION getRecommend");
    // set filter params
    let data = {};
    let param = route.split("/")[2]
    if (param === "recommend" || param === "search"){
        data = store.getState().match.filter;
    } else {
        data = { type: param };
    }
    console.log("FILTER", data);
    console.log("filter ON", filterIsOn);
    try {
        let res = {};
        if (filterIsOn > 0) {
            console.log("here");
            res = await axios.post('/match/filter', data);
        } else {
            res = await axios.get(route);
        }
        dispatch({
            type: GET_MATCH,
            payload: res.data,
        });
    } catch (err) {
        // console.log('error in recomm', err);
        dispatch({
            type: MATCH_ERROR,
            payload: { msg: err },
        });
    }
};

// Get current user profile
export const getFiltered = (filter) => async dispatch => {
    let route = '/match/filter';

    const data = filter
    try {
        // console.log("got to try");
        const res = await axios.post(route, data);
        // console.log("from server", res.data);
        dispatch({
            type: GET_MATCH,
            // payload: filter,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: MATCH_ERROR,
            payload: { msg: err },
        });
    }
};


// Get more matches
export const fetchMore = () => dispatch => {
    dispatch({
        type: FETCH_MORE_MATCH,
    });
};

// Get more matches
export const resetFilter = () => dispatch => {
    dispatch({
        type: FILTER_RESET,
    });
};

// Update filters
export const updateFilter = (filter) => dispatch => {
    // console.log("ACTION", filter);
    // console.log(store.getState().match.filter);
    dispatch({
        type: FILTER_UPDATE,
        payload: filter,
    });
};
