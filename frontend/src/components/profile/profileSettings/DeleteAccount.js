import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

import { deleteProfile } from '../../../actions/profile';
import CustomButton from '../../common/Button';

const DeleteAccount = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);

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
                <CustomButton type="submit">Delete</CustomButton>
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
