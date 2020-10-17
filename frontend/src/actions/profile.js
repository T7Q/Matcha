import axios from 'axios';
import {
    CREATE_PROFILE,
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    UPDATE_LIKES,
    UPDATE_ERROR,
    LOGOUT,
    UPDATE_BlOCKED,
} from './types';
import { setSnackbar } from './setsnackbar';
import { loadUser } from './auth';

// Get user profile
export const getProfile = (type, userId) => async dispatch => {
    // clear profile state to prevent blinking of old info on screen
    // dispatch({ type: CLEAR_PROFILE });

    // send request to corresponding router depending on wheather profile is My or Other user
    try {
        const res =
            type === 'myProfile' ? await axios.get('/profile/me') : await axios.get(`/profile/user/${userId}`);

        if (res.data.error) {
            console.log('response DATA', res.data);
            dispatch({
                type: GET_PROFILE,
                payload: null,
            });
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    snackbarOpen: true,
                    snackbarType: 'error',
                    snackbarMessage: res.data.error,
                },
            });
        } else {
            // send data to reducer
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
        }
    } catch (err) {
        dispatch({ type: PROFILE_ERROR, payload: { status: err } });
    }
};

const convertImages = images => {
    const data = {
        key: 'photo',
        value: Object.entries(images)
            .filter(value => value[0].includes('base') && value[1])
            .map(value =>
                value[0] === 'base1' ? { type: 'profile', data: value[1] } : { type: 'photo', data: value[1] }
            ),
    };
    return data;
};

export const createProfile = (formData, images, history) => async dispatch => {
    try {
        const imagesToSubmit = convertImages(images);
        const res = await axios.post('profile/create', formData);

        if (res.data.error) {
            const errors = res.data.error;
            dispatch(setSnackbar(true, 'error', 'Check all your data again'));
            return errors;
        } else {
            dispatch({ type: CREATE_PROFILE, payload: res.data });
            await axios.post('/profile/uploadphoto', imagesToSubmit);
            dispatch(loadUser());
            history.push('/Profile');
        }
    } catch (err) {
        console.log(err);
    }
};

// Add like, update connection level
export const addLike = (location, toUserId, match, profile) => async dispatch => {
    try {
        await axios.post(`/profile/addinteraction/likes/${toUserId}`, {});
        const result = await axios.post(`/profile/connected/${toUserId}`, {});
        if (location === 'userCard') {
            match.forEach(element => {
                if (element.user_id === toUserId) {
                    element['connected'] = result.data.msg;
                }
            });
        } else if (location === 'profile') {
            profile.connected = result.data.msg;
        }
        dispatch({ type: UPDATE_LIKES });
    } catch (err) {
        dispatch({
            type: UPDATE_ERROR,
            payload: { status: err },
        });
    }
};

// Remove like, update connection level
export const removeLike = (location, toUserId, match, profile) => async dispatch => {
    try {
        await axios.post(`/profile/removeinteraction/likes/${toUserId}`, {});
        const result = await axios.post(`/profile/connected/${toUserId}`, {});
        if (location === 'userCard') {
            match.forEach(element => {
                if (element.user_id === toUserId) {
                    element['connected'] = result.data.msg;
                }
            });
        } else if (location === 'profile') {
            profile.connected = result.data.msg;
        }
        dispatch({ type: UPDATE_LIKES });
    } catch (err) {
        dispatch({ type: UPDATE_ERROR, payload: { status: err } });
    }
};

// Add like, update connection level
export const addInteraction = (type, toUserId) => async dispatch => {
    try {
        const result = await axios.post(`/profile/addinteraction/${type}/${toUserId}`, {});
        if (type === 'blocked') {
            dispatch({ type: UPDATE_BlOCKED, payload: '1' });
        } else {
            dispatch(setSnackbar(true, 'success', result.data.msg));
        }
    } catch (err) {
        dispatch(setSnackbar(true, 'error', 'Something went wrong saving your preference. Try again.'));
    }
};

// Add like, update connection level
export const unblockUser = (location, unblockList) => async dispatch => {
    try {
        for (const e of unblockList) {
            await axios.post(`/profile/removeinteraction/blocked/${e.user_id}`, {});
        }
        if (location === 'settings') {
            dispatch(setSnackbar(true, 'success', 'Successfully updated'));
        } else if (location === 'profile') {
            dispatch({
                type: UPDATE_BlOCKED,
                payload: '0',
            });
        }
    } catch (err) {
        dispatch(setSnackbar(true, 'error', 'Something went wrong unblocking users. Try again.'));
    }
};

export const deleteProfile = history => async dispatch => {
    try {
        const res = await axios.post('/profile/delete/', { key: 'delete1' });
        if (res.data.error) {
            dispatch(setSnackbar(true, 'error', 'Something went wrong. Try again later or contact with us.'));
        } else {
            dispatch({ type: LOGOUT });
            history.push('/');
        }
    } catch (error) {
        console.log(error);
    }
};

export const editProfile = user => async dispatch => {
    dispatch({
        type: UPDATE_PROFILE,
        payload: { user: user },
    });
};
