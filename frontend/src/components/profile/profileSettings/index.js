import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { Box, Typography, Grid, Tab, Tabs } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { NotificationsActive, Lock, Email, Block, Delete, Public } from '@material-ui/icons';
import NotificationsTab from './Notifications';
import PasswordTab from './Password';
import EmailTab from './Email';
import GeolocationTab from './Geolocation';
import BlockedUsersTab from './BlockedUsers';
import DeleteAccountTab from './DeleteAccount';
import { setSnackbar } from '../../../actions/setsnackbar';
import { settingStyles } from '../../../styles/settingStyles';
import { chatStyles } from '../../../styles/chatStyles';

const Settings = ({ history }) => {
    const classesSetting = settingStyles();
    const classesChat = chatStyles();
    let { type } = useParams();

    const indexToTabName = [
        '',
        'notifications',
        'password',
        'email',
        'location',
        'blocked',
        'delete',
    ];
    if (!indexToTabName.includes(type)) {
        type = '';
    }
    const [tab, setTab] = useState(indexToTabName.indexOf(type));

    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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
                className={classesChat.header}>
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
                            justify={tab === 0 ? 'center' : 'center'}
                            // justify={tab === 0 ? "flex-start" : "center"}
                        >
                            <Tabs
                                indicatorColor="primary"
                                textColor="primary"
                                orientation="vertical"
                                value={tab}
                                onChange={handleChange}>
                                <Tab style={{ display: 'none' }} label="hidden" />
                                <Tab
                                    label="&emsp;Notifications"
                                    icon={<NotificationsActive />}
                                    className={classesSetting.tabs}
                                />
                                <Tab
                                    label="&emsp;Change password"
                                    icon={<Lock />}
                                    className={classesSetting.tabs}
                                />
                                <Tab
                                    label="&emsp;Change email"
                                    icon={<Email />}
                                    className={classesSetting.tabs}
                                />
                                <Tab
                                    label="&emsp;Change geolocation&emsp;"
                                    icon={<Public />}
                                    className={classesSetting.tabs}
                                />
                                <Tab
                                    label="&emsp;Blocked users"
                                    icon={<Block />}
                                    className={classesSetting.tabs}
                                />
                                <Tab
                                    label="&emsp;Delete account"
                                    icon={<Delete />}
                                    className={classesSetting.tabs}
                                />
                            </Tabs>
                        </Grid>
                        <Grid
                            container
                            // justify={isMobile ? "center" : "center"}
                            justify="center"
                            item
                            sm={6}
                            xs={12}>
                            <Box pt={3} m={3} style={{ width: '300px', paddingTop: 0 }}>
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
                </Container>
            </Box>
        </Box>
    );
};

export default Settings;
