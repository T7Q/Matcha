import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import authService from '../services/authService';
import { setSnackbar } from './setsnackbar';
import {
    LOGIN_SUCCESS,
    AUTH_SUCCESS,
    UPDATE_USER,
    AUTH_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT,
    LOAD_SOCKET,
} from './types';

export const loadUser = () => async (dispatch) => {
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

export const register = (formData, history) => async (dispatch) => {
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

export const login = (data) => async (dispatch) => {
    try {
        const res = await authService.login(data);

        if (res.error) {
            dispatch({ type: AUTH_FAIL });
            return res;
        } else {
            dispatch({ type: LOGIN_SUCCESS, payload: res });
            dispatch(loadUser());
        }
    } catch (error) {
        console.log(error);
    }
};

export const logout = (history) => async (dispatch) => {
    try {
        await axios.post('/account/logout');
    } catch (error) {
        console.log(error);
    }
    dispatch({ type: LOGOUT });
    history.push('/');
};

export const loadSocket = (socket) => async (dispatch) => {
    dispatch({ type: LOAD_SOCKET, payload: socket });
};

export const updateUser = (user) => async (dispatch) => {
    dispatch({
        type: UPDATE_USER,
        payload: user,
    });
};

export const googleLogin = (googleUser) => async (dispatch) => {
    try {
        const res = await authService.google(googleUser.getAuthResponse().id_token);

        if (res.error) {
            dispatch({ type: AUTH_FAIL });
            return res;
        } else {
            dispatch({ type: LOGIN_SUCCESS, payload: res });
            dispatch(loadUser());
        }
    } catch (error) {
        console.log(error);
    }
};
