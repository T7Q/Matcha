import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography, Grid, Tab, Tabs, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { NotificationsActive, Lock, Email, Block, Delete } from '@material-ui/icons';
import { getProfile } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';
import Bio from './Bio';
import Birthdate from './Birthdate';
import Name from './Name';
import Passion from './Passion';
import Username from './Username';
import SexPreference from './SexPreference';
import Photos from './Photos';

const Edit = ({ getProfile, profile: { profile, loading } }) => {
    const [tab, setTab] = useState(0);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    useEffect(() => {
        getProfile('myProfile');
    }, [getProfile]);

    console.log(profile);

    return loading ? (
        <Spinner />
    ) : (
        <Box minHeight="80vh" display="flex" flexDirection="column">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                bgcolor="secondary.main"
                pl={8}
                height="80px">
                <Typography variant="h5">Profile edit</Typography>
            </Box>
            <Box alignItems="center" flexGrow={1} display="flex">
                <Grid container>
                    <Grid container item sm={3} xs={12} justify="center">
                        <Tabs
                            indicatorColor="primary"
                            textColor="primary"
                            orientation="vertical"
                            value={tab}
                            onChange={handleChange}>
                            <Tab style={{ display: 'none' }} label="hidden" />
                            <Tab label="&emsp;Bio &emsp;&emsp;&emsp;&#8811;" icon={<NotificationsActive />} />
                            <Tab label="&emsp;Birthdate&emsp;&#8811;" icon={<Lock />} />
                            <Tab label="&emsp;Username &emsp;&emsp;&emsp;&#8811;" icon={<Email />} />
                            <Tab label="&emsp;Passion &nbsp; &emsp;&emsp;&#8811;" icon={<Block />} />
                            <Tab label="&emsp;Name &nbsp; &nbsp;&emsp;&#8811;" icon={<Delete />} />
                            <Tab label="&emsp;Sex preference &nbsp; &nbsp;&emsp;&#8811;" icon={<Delete />} />
                            <Tab label="&emsp;Photos &nbsp; &nbsp;&emsp;&#8811;" icon={<Delete />} />
                        </Tabs>
                    </Grid>
                    <Grid container justify={isMobile ? 'center' : 'flex-start'} item sm={9} xs={12}>
                        <Box pt={3} m={3}>
                            {tab === 0 && <></>}
                            {tab === 1 && <Bio bioProp={profile.bio} />}
                            {tab === 2 && <Birthdate />}
                            {tab === 3 && <Username usernameProp={profile.username} />}
                            {tab === 4 && <Passion />}
                            {tab === 5 && <Name firstName={profile.first_name} lastName={profile.last_name} />}
                            {tab === 6 && <SexPreference />}
                            {tab === 7 && <Photos />}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

Edit.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfile })(Edit);
