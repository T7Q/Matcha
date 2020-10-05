import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { LOGIN_SUCCESS, AUTH_SUCCESS, AUTH_FAIL, REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT, MESSAGE } from './types';

export const loadUser = () => async dispatch => {
    // console.log('in load user');
    setAuthToken(localStorage.getItem('token'));

    try {
        const res = await axios.get('/account/auth');
        // console.log(res.data);
        if (res.data.error) {
            dispatch({
                type: AUTH_FAIL,
            });
        } else {
            dispatch({
                type: AUTH_SUCCESS,
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
            dispatch({
                type: MESSAGE,
                payload: 'Verify your email to secure your account',
            });
            props.history.push('/message');
            setTimeout(() => props.history.push('/login'), 5000);
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
        console.log(body);
        const res = await axios.post('/account/login', body, config);
        console.log(res.data);
        if (res.data.error) {
            const error = res.data.error;
            dispatch(setAlert(error, 'danger'));
            dispatch({ type: AUTH_FAIL });
        } else {
            // console.log('in login before success');
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            // console.log('in login before loaduser');
            dispatch(loadUser());
        }
    } catch (error) {
        console.log(error);
    }
};

// LOGOUT / Clear profile
export const logout = history => async dispatch => {
    try {
        await axios.post('/account/logout');
    } catch (error) {
        console.log(error);
    }
    dispatch({ type: LOGOUT });
    history.push('/');
};

// Forgot password
export const forgetPwd = ({ email, history }) => async dispatch => {
    try {
        const res = await axios.post('/account/pwdReset', { email });
        if (res.data.error) {
            const error = res.data.error;
            dispatch(setAlert(error, 'danger'));
        } else {
            dispatch({
                type: MESSAGE,
                payload: "We've send you an email to reset your password",
            });
            history.push('/message');
            setTimeout(() => history.push('/'), 5000);
        }
    } catch (error) {
        console.log(error);
    }
};

export const updatePwd = ({ password, confirmPassword, history }) => async dispatch => {
    try {
        const res = await axios.post('/account/pwdUpdate', { password, confirmPassword });
        if (res.data.error) {
            const error = res.data.error;
            dispatch(setAlert(error, 'danger'));
        } else {
            history.push('/login');
        }
    } catch (error) {
        console.log(error);
    }
};
