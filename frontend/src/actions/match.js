import axios from 'axios';
import { GET_MATCH, MATCH_ERROR, FETCH_MORE_MATCH, GET_FILTER_MATCH } from './types';
import store from '../store';
// const route = `/match/recommend`;

// Get current user profile
export const getRecommend = (route, filterIsOn) => async dispatch => {
    // let route = '';
    // console.log("actions PATH", route);
    // console.log("filterIsOn", filterIsOn);

    const data = store.getState().match.filter;
    // console.log("filter from state", data);

    try {
        let res = {};
        if (filterIsOn === 1) {
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
