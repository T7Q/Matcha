import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { deleteProfile } from '../../../actions/profile';
import CustomButton from '../../common/Button';
import { btnStyles } from '../../../styles/btnStyles';
import { profileStyles } from '../../../styles/profileStyles';

const DeleteAccount = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const classes = btnStyles();
    const classesProf = profileStyles();

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
                        {open && (
                            <IconButton
                                aria-label="close"
                                className={classesProf.closeButton}
                                onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant="h6">
                            Are you sure you want to delete account?
                        </Typography>
                        <Typography variant="body1">You can't undo this action</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            style={{ margin: 'auto' }}
                            className={`${classes.mainButton} ${classes.secondButton}`}
                            onClick={deleteAccount}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </form>
    );
};

export default DeleteAccount;
