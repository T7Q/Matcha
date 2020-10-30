import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Tooltip } from '@material-ui/core';
import { Favorite, Chat, Block } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { addLike, removeLike } from '../../../actions/profile';
import { setSnackbar } from '../../../actions/setsnackbar';
import { profileStyles } from '../../../styles/profileStyles';
import { systemStyles } from '../../../styles/systemStyles';

const Buttons = ({ card }) => {
    const dispatch = useDispatch();
    const { match, auth, profile } = useSelector((state) => state);
    const classesProf = profileStyles();
    const classes = systemStyles();

    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            let toUserId = card.user_id;
            if (card.connected === 0 || card.connected === 3) {
                if (card.connected === 3) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'match');
                } else {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'like');
                }
                dispatch(addLike('profile', toUserId, match.match, profile.profile));
            } else {
                if (card.connected === 2) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'unlike');
                }
                dispatch(removeLike('profile', toUserId, match.match, profile.profile));
            }
        } else {
            dispatch(
                setSnackbar(true, 'error', 'Add at least 1 photo to enable like functionality')
            );
        }
    };

    if (card.blocked === '1') {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <Tooltip title="You have blocked this user">
                    <Block className={classes.fillInfo} fontSize="large" />
                </Tooltip>
            </Box>
        );
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <Button
                onClick={handleLike}
                variant="outlined"
                className={classesProf.likeButton}
                startIcon={<Favorite />}>
                {card.connected > 0 && card.connected < 3 ? 'Unmatch' : 'Like'}
            </Button>

            {card.connected === 2 && (
                <Button
                    variant="outlined"
                    component={Link}
                    to={`/messages/${profile.profile.user_id}`}
                    className={classesProf.chatButton}
                    startIcon={<Chat />}>
                    Chat
                </Button>
            )}
        </Box>
    );
};

export default Buttons;
