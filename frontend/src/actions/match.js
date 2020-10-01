import axios from 'axios';
import { GET_MATCH, MATCH_ERROR, FETCH_MORE_MATCH } from './types';

// const route = `/match/recommend`;

// Get current user profile
export const getRecommend = (path) => async dispatch => {
    let route = '';
    // console.log("PATH", path);
    switch(path){
        case("/matches"):
            route = `/match/recommend`;
            break;
        case("/likes"):
            route = `/match/likedme`;
            break;
    }
    // console.log("temp", temp);
    // console.log("getRecommended");
    try {
        // console.log("getRecommended TRY");
        // const res = await axios.get(`/match/recommend`);
        const res = await axios.get(route);
        // console.log("res.data", res.data);
        dispatch({
            type: GET_MATCH,
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
        type: FETCH_MORE_MATCH
    });
}