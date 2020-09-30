import axios from 'axios';
import { GET_MATCH, MATCH_ERROR } from './types';

// Get current user profile
export const getRecommend = () => async dispatch => {
    try {
        const data = {
            limit: 10,
            offset: 2
        }
        const res = await axios.post('/match/recommend', data);
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