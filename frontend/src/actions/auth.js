import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setSnackbar } from './setsnackbar';
import {
    LOGIN_SUCCESS,
    AUTH_SUCCESS,
    AUTH_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT,
    LOAD_SOCKET,
} from './types';

export const loadUser = () => async dispatch => {
    setAuthToken(localStorage.getItem('token'));

    try {
        const res = await axios.get('/account/auth');

        if (res.data.error) {
            dispatch({ type: AUTH_FAIL });
        } else {
            dispatch({ type: AUTH_SUCCESS, payload: res.data });
        }
    } catch (error) {
        console.log(error);
    }
};

export const register = (formData, history) => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify(formData);

    try {
        const res = await axios.post('/account/register', body, config);

        if (res.data.error) {
            const errors = res.data.error;
            dispatch({ type: REGISTER_FAIL });
            return errors;
        } else {
            dispatch({ type: REGISTER_SUCCESS, payload: 'here' });
            dispatch(setSnackbar(true, 'warning', 'Please, verify your account.'));
            setTimeout(() => history.push('/'), 1000);
        }
    } catch (error) {
        console.log(error);
    }
};

export const login = props => async dispatch => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify(props);

    try {
        const res = await axios.post('/account/login', body, config);

        if (res.data.error) {
            const error = res.data.error;
            dispatch({ type: AUTH_FAIL });
            return { error: error };
        } else {
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            dispatch(loadUser());
        }
    } catch (error) {
        console.log(error);
    }
};

export const logout = history => async dispatch => {
    try {
        await axios.post('/account/logout');
    } catch (error) {
        console.log(error);
    }
    dispatch({ type: LOGOUT });
    history.push('/');
};

export const forgetPwd = ({ email, history }) => async dispatch => {
    try {
        const res = await axios.post('/account/pwdReset', { email });

        if (res.data.error) {
            return res.data.error;
        } else {
            dispatch(setSnackbar(true, 'success', "We've send you an email to reset your password"));
            setTimeout(() => history.push('/'), 1000);
        }
    } catch (error) {
        console.log(error);
    }
};

export const updatePwd = ({ password, confirmPassword, history }) => async dispatch => {
    try {
        const res = await axios.post('/account/pwdUpdate', { password, confirmPassword });

        if (res.data.error) {
            return res.data.error;
        } else {
            history.push('/login');
        }
    } catch (error) {
        console.log(error);
    }
};

export const loadSocket = socket => async dispatch => {
    dispatch({ type: LOAD_SOCKET, payload: socket });
};
