import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Tabs, Tab, Typography, Box, Container, Badge } from '@material-ui/core';
import Match from '../common/matchGallery/GetMatches';
import { getNotifications, updateNotifications } from '../../actions/notifications';

const Likes = ({ match, history, socket, getNotifications, updateNotifications, notifications }) => {
    const { page } = match.params;

    const indexToTabName = ['likesyou', 'connected', 'temp'];

    const [selectedTab, setValue] = useState(indexToTabName.indexOf(page));
    const [newLikes, setNewLikes] = useState(false);
    const [newUnlikes, setNewUnlikes] = useState(false);

    useEffect(() => {
        let isMounted = true;
        socket.on('UPDATE_NOTIFICATIONS', type => {
            if (isMounted && type === 'unlike') {
                setNewUnlikes(true);
            }
        });
        if (page === 'connected') {
            updateNotifications('unlike');
        } else if (page === 'likesyou') {
            updateNotifications('like');
        }
        return () => {
            isMounted = false;
        };
    }, [page, socket, updateNotifications]);

    useEffect(() => {
        let isMounted = true;
        socket.on('UPDATE_NOTIFICATIONS', type => {
            if (isMounted && type === 'like') {
                setNewLikes(true);
            }
        });
        updateNotifications('like');
        return () => {
            isMounted = false;
        };
    }, [updateNotifications]);

    const handleChange = (event, newValue) => {
        history.push(`/likes/${indexToTabName[newValue]}`);
        setValue(newValue);
    };

    return (
        <div>
            <AppBar color="secondary" position="static">
                <Box p={2} justifyContent="center">
                    <Typography variant="h6">Likes</Typography>
                    {newLikes && <Typography>You have new likes, refresh the page</Typography>}
                    {newUnlikes && <Typography>You have new unlikes, refresh the page</Typography>}
                </Box>
                <Tabs value={selectedTab} onChange={handleChange}>
                    <Tab
                        label={
                            <Badge badgeContent={notifications.like} color="primary">
                                Likes you
                            </Badge>
                        }
                    />
                    <Tab
                        label={
                            <Badge badgeContent={-notifications.unlike} color="error">
                                Connected
                            </Badge>
                        }
                    />
                </Tabs>
            </AppBar>

            <Container>
                {selectedTab === 0 && (
                    <Box p={3}>
                        <Match route="/match/likedme" filterIsOn={0} />
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box p={3}>
                        <Match route="/match/connected" filterIsOn={0} />
                    </Box>
                )}
            </Container>
        </div>
    );
};

Likes.propTypes = {
    getNotifications: PropTypes.func.isRequired,
    updateNotifications: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    notifications: state.notifications,
});

export default connect(mapStateToProps, { updateNotifications, getNotifications })(Likes);
