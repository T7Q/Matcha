import axios from 'axios';
import { GET_MATCH, MATCH_ERROR, FETCH_MORE_MATCH } from './types';
import store from '../store'

// Get current user profile
export const getRecommend = ({limit, offset}) => async dispatch => {
    console.log("getRecommended");
    try {
        console.log("getRecommended TRY");
        const res = await axios.get(`/match/recommend?limit=${limit}&offset=${offset}`);
        console.log("res.data", res.data);
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


export const fetchMoreRecommend = (props) => async dispatch => {
    props.offset = props.offset + props.count;
    console.log("actions FetchMore");
    console.log("offset", props.offset);

    dispatch ({
        type: FETCH_MORE_MATCH
    });
};