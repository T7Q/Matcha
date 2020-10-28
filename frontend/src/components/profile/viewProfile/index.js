import React, { useEffect } from 'react';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';

import { getProfile } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';
import Header from './Header';
import Body from './Body';

const ProfileView = ({ socket }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { profile, loading } = useSelector((state) => state.profile);
    const { authUserId } = useSelector((state) => state.auth.user);
    const { user_id } = useParams();
    // get the type the profile (my or other user) based on url param
    let type = location.pathname === '/profile/me' ? 'myProfile' : 'otherUser';
    // map other user id from url param
    const otherUserId = location.pathname === '/profile/me' ? authUserId : user_id;

    // to redirect to authed user profile if auth user enteres his user id in params
    type = otherUserId === authUserId ? 'myProfile' : type;

    useEffect(() => {
        dispatch(getProfile(type, otherUserId, type !== 'myProfile'));
        if (type !== 'myProfile') {
            socket.emit('UPDATE_NOTIFICATIONS', otherUserId, 'visit');
        }
        dispatch({ type: 'UPDATE_PATH', payload: type });
    }, [type, otherUserId, socket, dispatch]);

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

export default ProfileView;
