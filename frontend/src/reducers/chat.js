import { GET_CONVERSATIONS, GET_MESSAGES } from '../actions/types';

const initialState = {
    conversations: [],
    messages: null,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CONVERSATIONS:
            return {
                ...state,
                conversations: payload,
            };
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
            };
        default:
            return state;
    }
}
