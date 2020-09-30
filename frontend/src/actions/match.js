import axios from 'axios';
import { GET_MATCH, MATCH_ERROR } from './types';

// Get current user profile
export const getRecommend = () => async dispatch => {
    try {
        const res = await axios.get('/match/recommend');
        dispatch({
            type: GET_MATCH,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: MATCH_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};