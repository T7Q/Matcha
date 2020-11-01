import { GET_CONVERSATIONS, GET_MESSAGES, CLEAR_MESSAGES } from '../actions/types';

const initialState = {
    conversations: [],
    messages: [],
    loading: true,
};

const chat = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_CONVERSATIONS:
            return {
                ...state,
                conversations: payload,
                loading: false,
            };
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
                loading: false,
            };
        case CLEAR_MESSAGES:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default chat;
