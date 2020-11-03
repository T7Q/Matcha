import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Tooltip } from '@material-ui/core';
import { Favorite, Chat, Block } from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { addLike, removeLike } from '../../../actions/profile';
import { setSnackbar } from '../../../actions/setsnackbar';
import { systemStyles } from '../../../styles/systemStyles';
import Button from '../../common/Button';

const Buttons = ({ card, updateStatus }) => {
    const dispatch = useDispatch();
    const { match, auth, profile } = useSelector((state) => state);
    const classes = systemStyles();

    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            let toUserId = card.user_id;
            if (card.connected === 0 || card.connected === 3) {
                if (card.connected === 3) {
                    updateStatus(2);
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'match');
                } else {
                    updateStatus(1);
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'like');
                }
                dispatch(addLike('profile', toUserId, match.match, profile.profile));
            } else {
                if (card.connected === 2) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'unlike');
                }
                updateStatus(0);
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
                customClass="likeButton"
                startIcon={<Favorite />}>
                {card.connected > 0 && card.connected < 3 ? 'Unmatch' : 'Like'}
            </Button>

            {card.connected === 2 && (
                <Button
                    variant="outlined"
                    component={Link}
                    customClass="chatButton"
                    to={`/messages/${profile.profile.user_id}`}
                    startIcon={<Chat />}>
                    Chat
                </Button>
            )}
        </Box>
    );
};

export default Buttons;
