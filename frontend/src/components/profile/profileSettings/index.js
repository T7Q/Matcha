import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Tab, Tabs, Container } from '@material-ui/core';
import { Lock, Email, Block, Delete, Public } from '@material-ui/icons';

import PasswordTab from './Password';
import EmailTab from './Email';
import GeolocationTab from './Geolocation';
import BlockedUsersTab from './BlockedUsers';
import DeleteAccountTab from './DeleteAccount';
import { setSnackbar } from '../../../actions/setsnackbar';
import { settingStyles } from '../../../styles/settingStyles';
import { systemStyles } from '../../../styles/systemStyles';

const Settings = ({ history }) => {
    const classes = settingStyles();
    const classesSystem = systemStyles();
    let { type } = useParams();

    const indexToTabName = ['', 'password', 'email', 'location', 'blocked', 'delete'];
    if (!indexToTabName.includes(type)) {
        type = '';
    }
    const [tab, setTab] = useState(indexToTabName.indexOf(type));

    const handleChange = (event, newTab) => {
        history.push(`/settings/${indexToTabName[newTab]}`);
        setTab(newTab);
    };

    return (
        <Box minHeight="80vh" display="flex" flexDirection="column">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                bgcolor="secondary.main"
                className={classes.header}>
                <Container>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={tab === 0 ? 12 : 4}
                        md={3}
                        justify={tab === 0 ? 'center' : 'center'}>
                        <Typography variant="h6">Account Settings</Typography>
                    </Grid>
                </Container>
            </Box>
            <Box alignItems="center" flexGrow={1} display="flex">
                <Container>
                    <Grid container>
                        <Grid
                            container
                            item
                            xs={12}
                            sm={tab === 0 ? 12 : 4}
                            md={3}
                            justify={tab === 0 ? 'center' : 'center'}>
                            <Tabs
                                indicatorColor="primary"
                                textColor="primary"
                                orientation="vertical"
                                value={tab}
                                onChange={handleChange}>
                                <Tab className={classesSystem.dNone} label="hidden" />
                                <Tab
                                    label="&emsp;Change password"
                                    icon={<Lock />}
                                    className={classes.tabs}
                                />
                                <Tab
                                    label="&emsp;Change email"
                                    icon={<Email />}
                                    className={classes.tabs}
                                />
                                <Tab
                                    label="&emsp;Change geolocation&emsp;"
                                    icon={<Public />}
                                    className={classes.tabs}
                                />
                                <Tab
                                    label="&emsp;Blocked users"
                                    icon={<Block />}
                                    className={classes.tabs}
                                />
                                <Tab
                                    label="&emsp;Delete account"
                                    icon={<Delete />}
                                    className={classes.tabs}
                                />
                            </Tabs>
                        </Grid>
                        <Grid container justify="center" item sm={6} xs={12}>
                            <Box m={3} width="300px" pt={0}>
                                {tab === 0 && <></>}
                                {tab === 1 && <PasswordTab setSnackbar={setSnackbar} />}
                                {tab === 2 && <EmailTab setSnackbar={setSnackbar} />}
                                {tab === 3 && <GeolocationTab setSnackbar={setSnackbar} />}
                                {tab === 4 && <BlockedUsersTab setSnackbar={setSnackbar} />}
                                {tab === 5 && <DeleteAccountTab setSnackbar={setSnackbar} />}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Settings;
