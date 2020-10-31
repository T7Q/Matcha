import { SET_SNACKBAR } from '../actions/types';

const initialState = {
    snackbarOpen: false,
    snackbarType: 'success',
    snackbarMessage: 'hello',
};

const snackbar = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SNACKBAR:
            return {
                ...state,
                snackbarOpen: payload.snackbarOpen,
                snackbarType: payload.snackbarType,
                snackbarMessage: payload.snackbarMessage,
            };
        default:
            return state;
    }
};

export default snackbar;
