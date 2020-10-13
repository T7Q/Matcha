import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Header from './ProfileItems/Header';
import Body from './ProfileItems/Body';

const Profile = ({ getProfile, profile: { profile, loading }, authUserId, ...props }) => {
    // get the type the profile (my or other user) based on url param
    let type = props.match.path === '/profile/me' ? 'myProfile' : 'otherUser';
    // map other user id from url param
    const otherUserId = props.match.path === '/profile/me' ? authUserId : props.match.params.user_id;
    // to prevent error if auth user enteres its user id in params
    type = otherUserId === authUserId ? '/profile/me' : type;

    useEffect(() => {
        getProfile(type, otherUserId);
    }, [getProfile, type, otherUserId]);

    return loading ? (
        <Spinner />
    ) : (
        <>
            <Header profile={profile} type={type} />
            <Box pt={8}>
                <Body profile={profile} />
            </Box>
        </>
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
