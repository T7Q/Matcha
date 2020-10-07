import React, { useState } from 'react';
import { TextField, FormGroup, Box, Button, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';

const DeleteAccount = () => {
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        console.log('delete account');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box m={{ xs: 2, sm: 0 }} mr={{ sm: 6 }} textAlign="center">
                <Typography variant="h6">When you delete your account, everything is permanently gone.</Typography>
                <Typography variant="h6">Your account will no longer appear to other people on Matcha.</Typography>
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    className={`${classes.customButton} ${classes.p2}`}>
                    Delete
                </Button>
            </Box>
        </form>
    );
};

export default DeleteAccount;
