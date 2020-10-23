import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { getProfile } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';
import Header from './Header';
import Body from './Body';
import { useDispatch } from 'react-redux';

const ProfileView = ({
    getProfile,
    profile: { profile, loading },
    authUserId,
    previousPath,
    socket,
    ...props
}) => {
    const dispatch = useDispatch();

    // get the type the profile (my or other user) based on url param
    let type = props.match.path === '/profile/me' ? 'myProfile' : 'otherUser';
    // map other user id from url param
    const otherUserId = props.match.path === '/profile/me' ? authUserId : props.match.params.user_id;
    // to prevent error if auth user enteres its user id in params

    type = otherUserId === authUserId ? 'myProfile' : type;

    // console.log("profile component error", profile.error);

    useEffect(() => {
        getProfile(type, otherUserId, type !== 'myProfile');
        if (type !== 'myProfile') {
            // console.log('not my profile');
            socket.emit('UPDATE_NOTIFICATIONS', otherUserId, 'visit');
        }
        dispatch({ type: 'UPDATE_PATH', payload: type });
    }, [getProfile, type, otherUserId, socket]);

    if (profile === null) {
        return loading ? <Spinner /> : <div>Page is not found</div>;
    }

    return loading ? (
        <Spinner />
    ) : (
        <>
            <Header profile={profile} type={type} />
            <Box pt={8}>
                <Body profile={profile} type={type} />
            </Box>
        </>
    );
};

ProfileView.propTypes = {
    getProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    authUserId: PropTypes.string.isRequired,
    previousPath: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    authUserId: state.auth.user.userId,
    previousPath: state.auth.previousPath,
});

export default connect(mapStateToProps, { getProfile })(ProfileView);
