import React, { useState } from 'react';
import { TextField, FormGroup, Box, Button, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';

const DeleteAccount = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const classes = useStyles();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = event => {
        event.preventDefault();
        console.log('delete account');
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box m={2} textAlign="center">
                <Typography>When you delete your account, everything is permanently gone.</Typography>
                <Typography>Your account will no longerappear to other people on Matcha.</Typography>
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
