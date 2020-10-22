import axios from 'axios';
import {
    GET_NOTIFICATIONS,
    GET_MESSAGE_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS,
    UPDATE_MESSAGE_NOTIFICATIONS,
} from './types';

export const getNotifications = () => async dispatch => {
    try {
        // console.log('in get notifications');
        const res = await axios.get('/profile/notifications/all');
        dispatch({ type: GET_NOTIFICATIONS, payload: res.data });
    } catch (err) {
        console.log('some error in get notifications action ', err);
    }
};

export const getMessageNotifications = () => async dispatch => {
    try {
        const res = await axios.get('/profile/notifications/messages');
        dispatch({ type: GET_MESSAGE_NOTIFICATIONS, payload: res.data });
    } catch (err) {
        console.log('some error in get notifications action ', err);
    }
};

export const updateNotifications = (type, senderId = 0) => async dispatch => {
    try {
        const res = await axios.delete(`/profile/notifications/${type}/${senderId}`);
        if (type === 'message') {
            // console.log('in action update notifications', type, senderId);
            dispatch({
                type: UPDATE_MESSAGE_NOTIFICATIONS,
                payload: { data: { [senderId]: 0 }, amount: res.data },
            });
            dispatch(getNotifications());
        } else {
            dispatch({ type: UPDATE_NOTIFICATIONS, payload: { [type]: 0 } });
        }
    } catch (err) {
        console.log('some error in get messages action ', err);
    }
};
