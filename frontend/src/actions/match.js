import axios from 'axios';
import { GET_MATCH, MATCH_ERROR, FETCH_MORE_MATCH, GET_FILTER_MATCH } from './types';

// const route = `/match/recommend`;

// Get current user profile
export const getRecommend = path => async dispatch => {
    // dispatch(loadUser());
    let route = '';
    // console.log("PATH", path);
    switch(path){
        case("/matches"):
            route = `/match/recommend`;
            break;
        // case("/likes"):
        //     route = `/match/likedme`;
        //     break;
    }
    // console.log("temp", temp);
    // console.log('getRecommended');
    try {
        // const res = await axios.get(`/match/recommend`);
        const res = await axios.get(route);
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
    // console.log("FILTER ACTION");
    // console.log("FILTER", filter);
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
