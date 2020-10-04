import axios from 'axios';
import { CREATE_PROFILE, PROFILE_ERROR } from './types';
import { setAlert } from './alert';
import { loadUser } from './auth';

// Get current user profile
export const getCurrentProfile = () => async dispatch => {
    try {
        // console.log('current profile');
        const res = await axios.get('/profile');
        dispatch({
            type: CREATE_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        // console.log('create profile');
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post('profile/create', formData, config);
        console.log('res', res);
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
            dispatch(loadUser());
            history.push('/Profile');
        }
    } catch (err) {
        console.log(err);
    }
};
