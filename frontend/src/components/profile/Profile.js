import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import { Typography, Grid } from '@material-ui/core';
// import ProfileActions from './ProfileActions';

import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

import ProfileHeader from './ProfileActions/ProfileHeader';

const Profile = ({ getProfile, profile: { profile, loading }, authUserId, ...props }) => {
    // get the type the profile (my or other user) based on url param
    const type = props.match.path === '/profile/me' ? 'myProfile' : 'otherUser';
    // map other user id from url param
    const otherUserId = props.match.path === '/profile/me' ? authUserId : props.match.params.user_id;
    // console.log("PROFILE user info", type, otherUserId, profile);

    useEffect(() => {
        getProfile(type, otherUserId);
        // addInteraction(),
    }, [getProfile, type, otherUserId]);

    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <ProfileHeader profile={profile} type={type} />
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6">My self-summary</Typography>
                    <Typography variant="body1">{profile.bio}</Typography>
                    <Typography variant="h6">My passions</Typography>
                    <Typography variant="body1">{profile.tags}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body1">
                        {profile.first_name} {profile.last_name}
                    </Typography>
                    <Typography variant="body1">{profile.username}</Typography>
                    <Typography variant="body1">
                        {profile.chinese_horo}, {profile.western_horo},{' '}
                        <Moment format="DD/MM/YYYY">{profile.birth_date}</Moment>
                    </Typography>
                    <Typography variant="body1">
                        {profile.gender} interested in {profile.sex_preference}
                    </Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
};

Profile.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    authUserId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    authUserId: state.auth.user.userId,
});

export default connect(mapStateToProps, { getProfile })(Profile);
