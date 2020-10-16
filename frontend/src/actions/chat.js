import axios from 'axios';
import { GET_CONVERSATIONS, GET_MESSAGES, CLEAR_MESSAGES } from './types';

// Get user conversations
export const getConversations = () => async dispatch => {
    try {
        const res = await axios.get('/chat');

        dispatch({
            type: GET_CONVERSATIONS,
            payload: res.data,
        });
    } catch (err) {
        console.log('some error in get converstaion action ', err);
    }
};

// Get messages
export const getMessages = chatId => async dispatch => {
    try {
        if (chatId === 0) {
            dispatch({ type: CLEAR_MESSAGES });
        } else {
            const res = await axios.get(`/chat/${chatId}`);

            dispatch({
                type: GET_MESSAGES,
                payload: res.data,
            });
        }
    } catch (err) {
        console.log('some error in get messages action ', err);
    }
};
