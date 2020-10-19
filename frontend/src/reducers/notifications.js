import {
    GET_NOTIFICATIONS,
    GET_MESSAGE_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS,
    UPDATE_MESSAGE_NOTIFICATIONS,
} from '../actions/types';

const initialState = {
    like: 0,
    unlike: 0,
    visit: 0,
    message: 0,
    messages: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                ...payload,
            };
        case GET_MESSAGE_NOTIFICATIONS:
            return {
                ...state,
                messages: payload,
            };
        case UPDATE_NOTIFICATIONS:
            return {
                ...state,
                ...payload,
            };
        case UPDATE_MESSAGE_NOTIFICATIONS:
            return {
                ...state,
                message: state.message - payload.amount,
                messages: { ...state.messages, ...payload.data },
            };
        default:
            return state;
    }
}
