import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfile } from '../../actions/profile';
import Typography from '@material-ui/core/Typography';
import ProfileActions from './ProfileActions';
import Moment from 'react-moment'; 

const Profile = ({ getProfile, profile: { profile, loading }, authUserId, ...props }) => {
    // get the type the profile (my or other user) based on url param
    const type = (props.match.path === "/profile/me" ? "myProfile" : "otherUser");
    // map other user id from url param
    const otherUserId = (props.match.path === "/profile/me" ? authUserId : props.match.params.user_id)

    useEffect(() => {
        getProfile(type, otherUserId);
    }, [getProfile, type, otherUserId]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>

            <ProfileActions />
            <Typography variant='h6'>
                user id: {profile.user_id}
                <ProfileActions />
            </Typography>
            <Typography variant='body1'>
                {profile.first_name} {profile.last_name}
                <ProfileActions />
            </Typography>
            <Typography variant='body1'>{profile.fame_rating}</Typography>
            <Typography variant='body1'>{profile.username}</Typography>
            <Typography variant='body1'>
                {profile.chinese_horo}, {profile.western_horo},{' '}
                <Moment format='DD/MM/YYYY'>{profile.birth_date}</Moment>
            </Typography>
            <Typography variant='body1'>
                {profile.gender} interested in {profile.sex_preference}
            </Typography>
            <Typography variant='h6'>My self-summary</Typography>
            <Typography variant='body1'>{profile.bio}</Typography>
            <Typography variant='h6'>My passions</Typography>
            <Typography variant='body1'>{profile.tags}</Typography>
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
