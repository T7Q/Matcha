import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox, FormGroup, FormControlLabel, Button, Typography } from '@material-ui/core';
import { useStyles } from '../../../styles/custom';

const Notifications = () => {
    const [notifications, setNotifications] = useState({
        email: false,
        push: false,
    });

    const { email, push } = notifications;
    const classes = useStyles();

    useEffect(() => {
        let isMounted = true;
        async function getNotifications() {
            const res = await axios.get('profile/notifications');
            isMounted && setNotifications(res.data);
        }
        getNotifications();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const res = await axios.post('/profile/notifications', notifications);
            return res.data;
        } catch (error) {
            // console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            value={email}
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
