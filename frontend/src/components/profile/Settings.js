import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import {
    Box,
    Typography,
    Grid,
    Tab,
    Tabs,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
    useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Input from '../common/Input';
import { useStyles } from '../../styles/custom';
import { NotificationsActive } from '@material-ui/icons';
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

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
                    label="Allow email notifications"
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
                    label="Allow push notifications"
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

const Settings = () => {
    const [tab, setTab] = useState(0);
    const classes = useStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Box minHeight="80vh" display="flex" flexDirection="column">
            <Box
                position="fixed"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                bgcolor="secondary.main"
                pl={8}
                height="80px">
                <Typography variant="h5">Account Settings</Typography>
            </Box>
            <Box alignItems="center" flexGrow={1} display="flex">
                <Grid container>
                    <Grid container item md={6} xs={12} justify="center">
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            orientation="vertical"
                            value={tab}
                            onChange={handleChange}>
                            <Tab style={{ display: 'none' }} label="hidden" />
                            <Tab label="&emsp;Notifications" icon={<NotificationsActive />} />
                            <Tab label="&emsp;Change password" icon={<LockOutlinedIcon />} />
                            <Tab label="&emsp;Change email" icon={<EmailOutlinedIcon />} />
                            <Tab label="&emsp;Blocked users" icon={<BlockOutlinedIcon />} />
                            <Tab label="&emsp;Delete account" icon={<DeleteOutlinedIcon />} />
                        </Tabs>
                    </Grid>
                    <Grid container justify={isMobile ? 'center' : 'flex-start'} item md={6} xs={12}>
                        <Box pt={3}>
                            {tab === 0 && <></>}
                            {tab === 1 && <Notifications />}
                            {tab === 2 && <div>Change password</div>}
                            {tab === 3 && <div>Change email</div>}
                            {tab === 4 && <div>Blocked users here</div>}
                            {tab === 5 && <div>are you sure</div>}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Settings;
