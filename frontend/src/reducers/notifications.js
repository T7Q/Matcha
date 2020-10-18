import { GET_NOTIFICATIONS, UPDATE_NOTIFICATIONS } from '../actions/types';

const initialState = {
    like: 0,
    unlike: 0,
    visit: 0,
    message: 0,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                ...payload,
            };
        case UPDATE_NOTIFICATIONS:
            return {
                notifications: payload,
            };
        default:
            return state;
    }
}
