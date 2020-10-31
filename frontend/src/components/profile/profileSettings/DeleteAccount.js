import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Box, Button, Typography } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { btnStyles } from '../../../styles/btnStyles';
import { deleteProfile } from '../../../actions/profile';

const DeleteAccount = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const classes = btnStyles();

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteAccount = () => {
        dispatch(deleteProfile(history));
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box textAlign="center">
                <Typography variant="body1">
                    When you delete your account, everything is permanently gone.
                </Typography>
                <Typography variant="body1">
                    Your account will no longer appear to other people on Astro Matcha.
                </Typography>
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.mainButton}>
                    Delete
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle id="alert-dialog-title">
                        Are you sure you want to delete account?
                    </DialogTitle>
                    <DialogContent>You can't undo this action</DialogContent>
                    <DialogActions>
                        <Button onClick={deleteAccount} variant="contained">
                            Delete
                        </Button>
                        <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </form>
    );
};

export default DeleteAccount;
