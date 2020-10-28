import axios from 'axios';
import profileService from '../services/profileService';

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
export const getProfile = (type, userId, otherProfile = false) => async (dispatch) => {
    // send request to corresponding router depending on wheather profile is My or Other user
    try {
        if (otherProfile) await axios.get(`/profile/visit/${userId}`);
        const res =
            type === 'myProfile'
                ? await profileService.getMyProfile()
                : await profileService.getUserProfile(userId);

        if (res.data.error) {
            dispatch({
                type: GET_PROFILE,
                payload: null,
            });
            dispatch(setSnackbar(true, 'error', res.data.error));
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

const convertImages = (images, profile = 'base1') => {
    const data = {
        key: 'photo',
        value: Object.entries(images)
            .filter((value) => value[0].includes('base') && value[1])
            .map((value) =>
                value[0] === profile
                    ? { type: 'profile', data: value[1] }
                    : { type: 'photo', data: value[1] }
            ),
    };
    return data;
};

export const createProfile = (formData, images, history) => async (dispatch) => {
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
        dispatch(setSnackbar(true, 'error', err));
    }
};

export const uploadPhotos = (images, profile) => async (dispatch) => {
    try {
        const imagesToSubmit = convertImages(images, profile);
        const result = await axios.post('/profile/uploadphoto', imagesToSubmit);
        if (result.data.error) {
            dispatch(setSnackbar(true, 'error', result.data.error));
        }
        dispatch(setSnackbar(true, 'success', result.data.msg));
    } catch (err) {
        dispatch(setSnackbar(true, 'error', err));
    }
};

// Add like, update connection level
export const addLike = (location, toUserId, match, profile) => async (dispatch) => {
    try {
        await profileService.addLike(toUserId);
        const result = await profileService.checkConnection(toUserId);
        if (location === 'userCard') {
            match.forEach((element) => {
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
export const removeLike = (location, toUserId, match, profile) => async (dispatch) => {
    try {
        await profileService.removeLike(toUserId);
        const result = await profileService.checkConnection(toUserId);
        if (location === 'userCard') {
            match.forEach((element) => {
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
export const addInteraction = (type, toUserId) => async (dispatch) => {
    try {
        const result = await profileService.addInteraction(type, toUserId);
        if (type === 'blocked') {
            dispatch({ type: UPDATE_BlOCKED, payload: '1' });
        } else {
            dispatch(setSnackbar(true, 'success', result.data.msg));
        }
    } catch (err) {
        dispatch(
            setSnackbar(true, 'error', 'Something went wrong saving your preference. Try again.')
        );
    }
};

// Add like, update connection level
export const unblockUser = (location, unblockList) => async (dispatch) => {
    try {
        for (const e of unblockList) {
            await profileService.unblockUser(e.user_id);
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

export const deleteProfile = (history) => async (dispatch) => {
    try {
        const res = await profileService.deleteProfile();
        if (res.data.error) {
            dispatch(
                setSnackbar(
                    true,
                    'error',
                    'Something went wrong. Try again later or contact with us.'
                )
            );
        } else {
            dispatch({ type: LOGOUT });
            history.push('/');
        }
    } catch (error) {
        dispatch(setSnackbar(true, 'error', error));
    }
};

export const editProfile = ({ key, value }) => async (dispatch) => {
    const res = await profileService.editProfile({ key, value });

    if (res.error) {
        return res;
    } else {
        dispatch({
            type: UPDATE_PROFILE,
            payload: { key, value },
        });
        dispatch(setSnackbar(true, 'success', res.msg));
    }
};

export const editTags = (data) => async (dispatch) => {
    const res = await profileService.editTags(data);

    if (res.error) {
        return res;
    } else {
        dispatch(setSnackbar(true, 'success', res.msg));
    }
};
