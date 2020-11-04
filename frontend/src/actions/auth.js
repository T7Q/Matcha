import { LOGIN_SUCCESS, AUTH_SUCCESS, UPDATE_USER, AUTH_FAIL } from './types';
import { REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT, LOAD_SOCKET } from './types';
import authService from '../services/authService';
import setAuthToken from '../utils/setAuthToken';
import { setSnackbar } from './setsnackbar';

export const loadUser = () => async (dispatch) => {
    setAuthToken(localStorage.getItem('token'));

    try {
        const res = await authService.auth();

        if (res.error) {
            dispatch({ type: AUTH_FAIL });
        } else {
            dispatch({ type: AUTH_SUCCESS, payload: res });
        }
    } catch (error) {
        dispatch({ type: AUTH_FAIL });
    }
};

export const register = (formData, history) => async (dispatch) => {
    try {
        const res = await authService.register(formData);

        if (res.error) {
            dispatch({ type: REGISTER_FAIL });
            return res.error;
        } else {
            dispatch({ type: REGISTER_SUCCESS, payload: 'here' });
            dispatch(setSnackbar(true, 'warning', 'Please, verify your account.'));
            setTimeout(() => history.push('/'), 1000);
        }
    } catch (error) {
        dispatch({ type: REGISTER_FAIL });
    }
};

export const login = (data) => async (dispatch) => {
    try {
        const res = await authService.login(data);

        if (res.error) {
            dispatch(setSnackbar(true, 'error', res.error));
            return res;
        } else {
            dispatch({ type: LOGIN_SUCCESS, payload: res });
            dispatch(loadUser());
        }
    } catch (error) {
        dispatch({ type: AUTH_FAIL });
    }
};

export const logout = (history) => async (dispatch) => {
    try {
        await authService.logout();
    } catch (error) {}
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
            dispatch(setSnackbar(true, 'error', res.error));
            return res;
        } else {
            dispatch({ type: LOGIN_SUCCESS, payload: res });
            dispatch(loadUser());
        }
    } catch (error) {}
};
