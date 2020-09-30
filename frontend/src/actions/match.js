import axios from 'axios';
import { GET_MATCH, FETCH_MORE_MATCH, MATCH_ERROR } from './types';

// Get current user profile
export const getRecommend = ({limit, offset}) => async dispatch => {
    console.log("getRecommended");
    try {
        console.log("getRecommended TRY");
        const res = await axios.get(`/match/recommend?limit=${limit}&offset=${offset}`);
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
    props.offset = props.offset + 3;
    console.log("actions FetchMore");
    console.log("got here limit=", props.limit, " offset= ", props.offset);
    console.log("props", props);
    try {
        const res = await axios.get(`/match/recommend?limit=${props.limit}&offset=${props.offset}`);
        console.log(props.match.concat(res.data));
        dispatch ({
            type: GET_MATCH,
            payload: props.match.concat(res.data),
        });
    } catch (err) {
        this.props.dispatchdispatch({
            // type: MATCH_ERROR,
            payload: { msg: err },
        });
    }
};