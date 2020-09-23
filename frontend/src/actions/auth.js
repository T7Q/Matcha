import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOAD_USER } from './types';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';

export const loadUser = () => async dispatch => {
    setAuthToken(localStorage.getItem('token'));

    try {
        const res = await axios.get('/account/auth');
        console.log(res.data);
        if (res.data.error) {
            dispatch({
                type: LOGIN_FAIL,
            });
        } else {
            dispatch({
                type: LOAD_USER,
                payload: res.data,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const register = props => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify(props);
    console.log(body);

    try {
        const res = await axios.post('/account/register', body, config);
        if (res.data.error) {
            const errors = res.data.error;
            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.error, 'danger')));
            }
            dispatch({
                type: REGISTER_FAIL,
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: 'here',
            });
        }
    } catch (error) {
        console.log(error);
    }
};

export const login = ({ username, password }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post('/account/login', body, config);
        console.log(res.data);
        if (res.data.error) {
            const error = res.data.error;
            dispatch(setAlert(error, 'danger'));
            dispatch({ type: LOGIN_FAIL });
        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            dispatch(loadUser());
        }
    } catch (error) {
        console.log(error);
    }
};
