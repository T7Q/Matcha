import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, withRouter } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Grid, Tab, Tabs } from '@material-ui/core';
import { register } from '../../actions/auth';
import Input from '../common/Input';
import { useStyles } from '../../styles/custom';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const Settings = () => {
    const [tab, setTab] = useState(0);
    const classes = useStyles();

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    return (
        <Box minHeight="80vh" display="flex" flexDirection="column">
            <Box
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
                    <Grid container md={6} xs={12} justify="center">
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            orientation="vertical"
                            value={tab}
                            onChange={handleChange}>
                            <Tab style={{ display: 'none' }} label="hidden" />
                            <Tab label="Notifications" icon={<NotificationsActiveOutlinedIcon />} />
                            <Tab label="Change password" icon={<LockOutlinedIcon />} />
                            <Tab label="Change email" icon={<EmailOutlinedIcon />} />
                            <Tab label="Blocked users" icon={<BlockOutlinedIcon />} />
                            <Tab label="Delete account" icon={<DeleteOutlinedIcon />} />
                        </Tabs>
                    </Grid>
                    <Grid container justify="center" md={6} xs={12}>
                        {tab === 0 && <div></div>}
                        {tab === 1 && <div>Notifications</div>}
                        {tab === 2 && <div>Change password</div>}
                        {tab === 3 && <div>Change email</div>}
                        {tab === 4 && <div>Blocked users here</div>}
                        {tab === 5 && <div>are you sure</div>}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Settings;
