import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Spinner from '../layout/Spinner';
import { getCurrentProfile } from '../../actions/profile';
import { Typography, Box } from '@material-ui/core';
import ProfileActions from './ProfileActions';

const Profile = ({ getCurrentProfile, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    console.log(profile);
    // const profileImage = profile.profile_pic_path ? profile.profile_pic_path : '/'

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Box bgcolor="black">
                {/* <img src={} /> */}
                <Typography variant="h4">{profile.first_name}</Typography>
            </Box>
            <ProfileActions />
            <Typography variant="h6">
                Logged in user id: {profile.user_id}
                <ProfileActions />
            </Typography>
            <Typography variant="body1">
                {profile.first_name} {profile.last_name}
                <ProfileActions />
            </Typography>
            <Typography variant="body1">{profile.fame_rating}</Typography>
            <Typography variant="body1">{profile.username}</Typography>
            <Typography variant="body1">
                {profile.chinese_horo}, {profile.western_horo},{' '}
                <Moment format="DD/MM/YYYY">{profile.birth_date}</Moment>
            </Typography>
            <Typography variant="body1">
                {profile.gender} interested in {profile.sex_preference}
            </Typography>
            <Typography variant="h6">My self-summary</Typography>
            <Typography variant="body1">{profile.bio}</Typography>
            <Typography variant="h6">My passions</Typography>
            <Typography variant="body1">{profile.tags}</Typography>
        </Fragment>
    );
};

Profile.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
