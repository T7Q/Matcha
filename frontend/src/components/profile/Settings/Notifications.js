import React, { useState } from 'react';
import { Box, Checkbox, FormGroup, FormControlLabel, Button, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';

const Notifications = () => {
    const [notifications, setNotifications] = useState({
        email: false,
        push: false,
    });

    const { email, push } = notifications;
    const classes = useStyles();

    const handleSubmit = event => {
        event.preventDefault();
        console.log('submit notifications');
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={email}
                            onChange={() => setNotifications({ ...notifications, email: !email })}
                            color="primary"
                        />
                    }
                    label={<Typography variant="h5">Allow email notifications</Typography>}
                    labelPlacement="start"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={push}
                            onChange={() => setNotifications({ ...notifications, push: !push })}
                            color="primary"
                        />
                    }
                    label={<Typography variant="h5">Allow push notifications</Typography>}
                    labelPlacement="start"
                />
                <Button
                    type="submit"
                    size="small"
                    variant="contained"
                    color="primary"
                    className={`${classes.customButton} ${classes.p2}`}>
                    Save
                </Button>
            </FormGroup>
        </form>
    );
};

export default Notifications;
