import axios from 'axios';
import { setAlert } from './alert';
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import setAuthToken from '../utils/setAuthToken';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';

export const loadUser = () => async (dispatch) => {
    if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
    }
};
// export const loadUser = () => async (dispatch) => {
//     try {
//         const res = await api.get('/auth');

//         dispatch({
//             type: USER_LOADED,
//             payload: res.data,
//         });
//     } catch (err) {
//         dispatch({
//             type: AUTH_ERROR,
//         });
//     }
// };

export const register = (props) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify(props);
    console.log(body);
    dispatch({ type: REGISTER_FAIL });
    try {
        await axios.post('/account/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: 'here',
        });
    } catch (error) {
        console.log(error);
        const errors = error.response.data;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.error, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }
};

export const login = ({ username, password }) => async (dispatch) => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post('/account/login', body, config);
        console.log(res.data);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        // dispatch(loadUser());
    } catch (error) {
        // console.log(error);
        console.log('here');
        const errors = error.response.data;
        if (errors) {
            dispatch(setAlert(errors.error, 'danger'));
        }
        dispatch({ type: LOGIN_FAIL });
    }
};
