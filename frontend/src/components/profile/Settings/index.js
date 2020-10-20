import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Grid, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { NotificationsActive, Lock, Email, Block, Delete, Public } from '@material-ui/icons';
import NotificationsTab from './Notifications';
import PasswordTab from './Password';
import EmailTab from './Email';
import GeolocationTab from './Geolocation';
import BlockedUsersTab from './BlockedUsers';
import DeleteAccountTab from './DeleteAccount';
import { setSnackbar } from '../../../actions/setsnackbar';

const Settings = ({ setSnackbar }) => {
    const [tab, setTab] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
                    <Grid container item sm={6} xs={12} justify="center">
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            orientation="vertical"
                            value={tab}
                            onChange={handleChange}>
                            <Tab style={{ display: 'none' }} label="hidden" />
                            <Tab
                                label="&emsp;Notifications &emsp;&emsp;&emsp;&#8811;"
                                icon={<NotificationsActive />}
                            />
                            <Tab label="&emsp;Change password&emsp;&#8811;" icon={<Lock />} />
                            <Tab label="&emsp;Change email &emsp;&emsp;&emsp;&#8811;" icon={<Email />} />
                            <Tab label="&emsp;Change geolocation &emsp;&emsp;&#8811;" icon={<Public />} />
                            <Tab label="&emsp;Blocked users &nbsp; &emsp;&emsp;&#8811;" icon={<Block />} />
                            <Tab label="&emsp;Delete account &nbsp; &nbsp;&emsp;&#8811;" icon={<Delete />} />
                        </Tabs>
                    </Grid>
                    <Grid container justify={isMobile ? 'center' : 'flex-start'} item sm={6} xs={12}>
                        <Box pt={3} m={3}>
                            {tab === 0 && <></>}
                            {tab === 1 && <NotificationsTab setSnackbar={setSnackbar} />}
                            {tab === 2 && <PasswordTab setSnackbar={setSnackbar} />}
                            {tab === 3 && <EmailTab setSnackbar={setSnackbar} />}
                            {tab === 4 && <GeolocationTab setSnackbar={setSnackbar} />}
                            {tab === 5 && <BlockedUsersTab setSnackbar={setSnackbar} />}
                            {tab === 6 && <DeleteAccountTab setSnackbar={setSnackbar} />}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

Settings.propTypes = {
    setSnackbar: PropTypes.func.isRequired,
};

export default connect(null, { setSnackbar })(Settings);
