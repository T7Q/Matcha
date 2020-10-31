import { GET_CONVERSATIONS, GET_MESSAGES, CLEAR_MESSAGES } from './types';
import chatService from '../services/chatService';
import { setSnackbar } from './setsnackbar';

export const getConversations = () => async (dispatch) => {
    try {
        const res = await chatService.getChats();

        if (res.error) {
            dispatch(setSnackbar(true, 'error', res.error));
        } else {
            dispatch({ type: GET_CONVERSATIONS, payload: res });
        }
    } catch (err) {
        console.log('some error in get converstaion action ', err);
    }
};

export const getMessages = (chatId) => async (dispatch) => {
    dispatch({ type: CLEAR_MESSAGES });
    try {
        if (chatId !== 0) {
            const res = await chatService.getMessages(chatId);
            if (res.error) {
                dispatch(setSnackbar(true, 'error', res.error));
            } else {
                dispatch({ type: GET_MESSAGES, payload: res });
            }
        }
    } catch (err) {
        console.log('some error in get messages action ', err);
    }
};
