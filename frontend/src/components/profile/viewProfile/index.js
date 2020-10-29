import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Container, Box } from '@material-ui/core';

import { getProfile } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';
import Header from './Header';
import Description from './Description';
import Highlights from './Highlights';

const ProfileView = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { profile, loading } = useSelector((state) => state.profile);
    const { user, socket } = useSelector((state) => state.auth);
    const { user_id } = useParams();

    // get the type the profile (my or other user) based on url param
    let type =
        location.pathname === '/profile/me' || location.pathname === `/profile/${user.userId}`
            ? 'myProfile'
            : 'otherUser';
    // map other user id from url param
    const otherUserId = type === 'myProfile' ? user.userId : user_id;

    useEffect(() => {
        dispatch(getProfile(type, otherUserId, type !== 'myProfile'));
        if (type !== 'myProfile') {
            socket.emit('UPDATE_NOTIFICATIONS', otherUserId, 'visit');
        }
        dispatch({ type: 'UPDATE_PATH', payload: type });
    }, [type, otherUserId, socket, dispatch]);

    if (profile === null || loading) {
        return loading ? <Spinner /> : <div>Page is not found</div>;
    }

    return (
        <>
            <Header type={type} />
            <Box pt={8}>
                <Container>
                    <Grid container justify="center" spacing={6}>
                        <Grid container item xs={10} sm={8} justify="center">
                            <Description type={type} />
                        </Grid>
                        <Grid container item xs={10} sm={4} justify="center">
                            <Highlights type={type} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default ProfileView;
