import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { setSnackbar } from '../../actions/setsnackbar';
import { componentStyles } from '../../styles/componentStyles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomizedSnackbars = () => {
    const dispatch = useDispatch();
    const { snackbarOpen, snackbarType, snackbarMessage } = useSelector((state) => state.snackbar);
    const classes = componentStyles();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setSnackbar(false, snackbarType, snackbarMessage));
    };

    return (
        <div className={classes.snackbar}>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} elevation={6} variant="filled" color={snackbarType}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomizedSnackbars;
