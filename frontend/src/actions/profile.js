import axios from 'axios';
import { CREATE_PROFILE, GET_PROFILE, PROFILE_ERROR, LOGOUT } from './types';
import { setAlert } from './alert';
import { loadUser } from './auth';

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        // console.log('current profile');
        const res = await axios.get('/profile');
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: err },
        });
    }
};

const convertImages = images => {
    const data = {
        key: 'photo',
        value: Object.values(images)
            .filter(value => !Array.isArray(value) && value !== '')
            .map(value => ({ type: 'profile', data: value })),
    };
    return data;
};

// Create or update profile
export const createProfile = (formData, images, history) => async dispatch => {
    try {
        // console.log('create profile');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const imagesToSubmit = convertImages(images);
        // console.log(imagesToSubmit);
        const res = await axios.post('profile/create', formData, config);
        // console.log('res', res);
        if (res.data.error) {
            const errors = res.data.error;
            errors.forEach(error => dispatch(setAlert(error.error, 'danger')));
            console.log('error in createprofile', errors);
            dispatch({
                type: PROFILE_ERROR,
                payload: res.data.error,
            });
        } else {
            dispatch({
                type: CREATE_PROFILE,
                payload: res.data,
            });
            const imagesRes = await axios.post('/profile/uploadphoto', imagesToSubmit, config);
            // console.log(imagesRes);
            if (imagesRes.data.error) {
                console.log(imagesRes.data.error);
            } else {
                // console.log('success', imagesRes);
            }
            dispatch(loadUser());
            history.push('/Profile');
        }
    } catch (err) {
        console.log(err);
    }
};

export const deleteProfile = history => async dispatch => {
    try {
        const res = await axios.post('/profile/delete', { key: 'delete' });
        if (res.data.error) {
            const error = res.data.error;
            dispatch(setAlert(error, 'danger'));
        } else {
            dispatch({ type: LOGOUT });
            history.push('/');
        }
    } catch (error) {
        console.log(error);
    }
};
