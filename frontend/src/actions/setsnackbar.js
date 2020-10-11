import { SET_SNACKBAR } from "../actions/types";

export const setSnackbar = (snackbarOpen, snackbarType, snackbarMessage) => (
    dispatch
) => {
    dispatch({
        type: SET_SNACKBAR,
        payload: {
            snackbarOpen: snackbarOpen,
            snackbarType: snackbarType,
            snackbarMessage: snackbarMessage,
        },
    });
};
