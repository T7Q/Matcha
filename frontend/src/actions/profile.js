import { CREATE_PROFILE, GET_PROFILE, LOGOUT, UPDATE_BLOCKED, CLEAR_PROFILE } from './types';
import { UPDATE_PROFILE, PROFILE_ERROR, UPDATE_LIKES, UPDATE_ERROR, UPDATE_USER } from './types';
import profileService from '../services/profileService';
import { setSnackbar } from './setsnackbar';
import { getConversations } from './chat';
import { loadUser } from './auth';
import store from '../store';

// Get user profile
export const getProfile = (type, userId, otherProfile = false) => async (dispatch) => {
    // send request to corresponding router depending on wheather profile is My or Other user
    try {
        if (otherProfile) await profileService.visit(userId);
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

export const clearProfile = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PROFILE,
    });
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
        const res = await profileService.create(formData);

        if (res.error) {
            const errors = res.error;
            dispatch(setSnackbar(true, 'error', 'Check all your data again'));
            return errors;
        } else {
            dispatch({ type: CREATE_PROFILE, payload: res });
            await dispatch(savePhotos(imagesToSubmit, false));
            dispatch(loadUser());
            history.push('/Profile');
        }
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
export const addInteraction = (type, toUserId, chat = false) => async (dispatch) => {
    try {
        const result = await profileService.addInteraction(type, toUserId);
        if (type === 'blocked') {
            if (chat) {
                dispatch(getConversations());
            } else {
                dispatch({ type: UPDATE_BLOCKED, payload: '1' });
            }
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
export const unblockUser = (location, unblockList) => async (dispatch, getState) => {
    try {
        for (const e of unblockList) {
            await profileService.unblockUser(e.user_id);
        }
        if (location === 'settings') {
            dispatch(setSnackbar(true, 'success', 'Successfully updated'));
        } else if (location === 'profile') {
            const res = await profileService.getUserProfile(getState().profile.profile.user_id);
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
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

export const editProfile = ({ key, value }, update = false) => async (dispatch) => {
    try {
        const res = await profileService.editProfile({ key, value });

        if (res.error) {
            return res;
        } else if (update) {
            dispatch({
                type: UPDATE_PROFILE,
                payload: { key, value },
            });
        }
        dispatch(setSnackbar(true, 'success', res.msg));
    } catch {
        dispatch(setSnackbar(true, 'error', 'Try later'));
    }
};

export const editTags = (data) => async (dispatch) => {
    try {
        const res = await profileService.editTags(data);

        if (res.error) {
            return res;
        } else {
            dispatch(setSnackbar(true, 'success', res.msg));
        }
    } catch {
        dispatch(setSnackbar(true, 'error', 'Try later'));
    }
};

export const savePhotos = (data, sn = true) => async (dispatch) => {
    try {
        const res = await profileService.uploadPhotos(data);

        if (res.error) {
            dispatch(setSnackbar(true, 'error', 'Try again later'));
        } else {
            const user = store.getState().auth.user;
            user.userHasPhotos = res.userHasPhotos;
            dispatch({
                type: UPDATE_USER,
                payload: user,
            });
            sn && dispatch(setSnackbar(true, 'success', 'You photos was successfully updated'));
        }
    } catch {
        dispatch(setSnackbar(true, 'error', 'Try later'));
    }
};
