import axios from 'axios';
import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from './types';

export const getNotifications = () => async dispatch => {
    try {
        const res = await axios.get('/profile/notifications');
        dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
    } catch (err) {
        console.log('some error in get notifications action ', err);
    }
};

export const updateNotifications = type => async dispatch => {
    try {
        const res = await axios.delete(`/profile/notifications/${type}`);
        dispatch({ type: UPDATE_NOTIFICATIONS, payload: res.data });
    } catch (err) {
        console.log('some error in get messages action ', err);
    }
};
