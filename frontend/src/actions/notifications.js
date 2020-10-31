import { GET_NOTIFICATIONS, GET_MESSAGE_NOTIFICATIONS } from './types';
import { UPDATE_NOTIFICATIONS, UPDATE_MESSAGE_NOTIFICATIONS } from './types';
import chatService from '../services/chatService';
import { setSnackbar } from './setsnackbar';

export const getNotifications = () => async (dispatch) => {
    setTimeout(async () => {
        try {
            const res = await chatService.getNotifications();
            if (res.error) {
                dispatch(setSnackbar(true, 'error', res.error));
            } else {
                dispatch({ type: GET_NOTIFICATIONS, payload: res });
            }
        } catch (err) {
            console.log('some error in get notifications action ', err);
        }
    }, 500);
};

export const getMessageNotifications = () => async (dispatch) => {
    try {
        const res = await chatService.getMessageNotifications();
        if (res.error) {
            dispatch(setSnackbar(true, 'error', res.error));
        } else {
            dispatch({ type: GET_MESSAGE_NOTIFICATIONS, payload: res });
        }
    } catch (err) {
        console.log(err);
    }
};

export const updateNotifications = (type, senderId = 0) => async (dispatch) => {
    try {
        const res = await chatService.updateNotifications(type, senderId);
        if (res.error) {
            dispatch(setSnackbar(true, 'error', res.error));
        } else if (type === 'message') {
            dispatch({
                type: UPDATE_MESSAGE_NOTIFICATIONS,
                payload: { data: { [senderId]: 0 }, amount: res },
            });
            dispatch(getNotifications());
        } else {
            dispatch({ type: UPDATE_NOTIFICATIONS, payload: { [type]: 0 } });
        }
    } catch (err) {
        console.log('some error in get messages action ', err);
    }
};
