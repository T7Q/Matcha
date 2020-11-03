import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Container, Box } from '@material-ui/core';

import { getProfile, clearProfile } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';
import Header from './Header';
import Description from './Description';
import Highlights from './Highlights';
import NotFound from '../../layout/NotFound';

const ProfileView = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { profile, loading } = useSelector((state) => state.profile);
    const { user, socket } = useSelector((state) => state.auth);
    const { user_id } = useParams();
    const [status, updateStatus] = React.useState(0);

    // get the type the profile (my or other user) based on url param
    let type =
        location.pathname === '/profile/me' || location.pathname === `/profile/${user.userId}`
            ? 'myProfile'
            : 'otherUser';
    // map other user id from url param
    const otherUserId = type === 'myProfile' ? user.userId : user_id;

    useEffect(() => {
        dispatch(clearProfile());
        dispatch(getProfile(type, otherUserId, type !== 'myProfile'));
        if (type !== 'myProfile') {
            socket.emit('UPDATE_NOTIFICATIONS', otherUserId, 'visit');
        }
        dispatch({ type: 'UPDATE_PATH', payload: type });
    }, [type, otherUserId, socket, dispatch]);

    useEffect(() => {
        updateStatus(0);
        if (profile && profile.connected) {
            updateStatus(profile.connected);
        }
    }, [profile]);

    if (profile === null || loading) {
        return loading ? <Spinner /> : <NotFound />;
    }

    return (
        <>
            <Header updateStatus={updateStatus} type={type} />
            <Box pt={8}>
                <Container>
                    <Grid container justify="center" spacing={6}>
                        <Grid container item xs={10} sm={8} justify="center">
                            <Description type={type} />
                        </Grid>
                        <Grid container item xs={10} sm={4} justify="center">
                            <Highlights status={status} type={type} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default ProfileView;
