import axios from 'axios';
import { GET_NOTIFICATIONS, GET_MESSAGE_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from './types';

export const getNotifications = () => async dispatch => {
    try {
        const res = await axios.get('/profile/notifications/all');
        dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
    } catch (err) {
        console.log('some error in get notifications action ', err);
    }
};

export const getMessageNotifications = () => async dispatch => {
    try {
        console.log('in message');
        const res = await axios.get('/profile/notifications/messages');
        console.log('in message', res);
        dispatch({ type: GET_MESSAGE_NOTIFICATIONS, payload: res.data });
    } catch (err) {
        console.log('some error in get notifications action ', err);
    }
};

export const updateNotifications = type => async dispatch => {
    try {
        await axios.delete(`/profile/notifications/${type}`);
        dispatch({ type: UPDATE_NOTIFICATIONS, payload: { [type]: 0 } });
    } catch (err) {
        console.log('some error in get messages action ', err);
    }
};
