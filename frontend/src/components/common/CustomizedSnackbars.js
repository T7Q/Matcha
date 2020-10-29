import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { setSnackbar } from '../../actions/setsnackbar';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const CustomizedSnackbars = () => {
    const dispatch = useDispatch();
    const snackbar = useSelector((state) => state.snackbar);

    const classes = useStyles();
    const snackbarOpen = snackbar.snackbarOpen;
    const snackbarType = snackbar.snackbarType;
    const snackbarMessage = snackbar.snackbarMessage;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setSnackbar(false, snackbarType, snackbarMessage));
    };

    return (
        <div className={classes.root}>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} elevation={6} variant="filled" color={snackbarType}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default CustomizedSnackbars;
