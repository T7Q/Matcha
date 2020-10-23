import React from 'react';
import { IconButton, Button, Box, Tooltip } from '@material-ui/core';
import { Favorite, Chat, Block } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addLike, removeLike } from '../../../actions/profile';
import { setSnackbar } from '../../../actions/setsnackbar';
import { profileStyles } from '../../../styles/profileStyles';
import { useTheme } from '@material-ui/core/styles';

const Buttons = ({ addLike, removeLike, setSnackbar, match, auth, card, profile }) => {
    const theme = useTheme();
    const classesProf = profileStyles();
    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            let toUserId = card.user_id;
            if (card.connected === 0 || card.connected === 3) {
                if (card.connected === 3) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'like', true);
                }
                auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'like', false);
                addLike('profile', toUserId, match.match, profile.profile);
            } else {
                if (card.connected === 2) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'unlike');
                }
                removeLike('profile', toUserId, match.match, profile.profile);
            }
        } else {
            setSnackbar(true, 'error', 'Add at least 1 photo to enable like functionality');
        }
    };

    if (card.blocked === '1') {
        return (
            <Box display="flex" alignItems="center" justifyContent="center">
                <Tooltip title="You have blocked this user">
                    <Block style={{ fill: theme.palette.info.main }} fontSize="large" />
                </Tooltip>
            </Box>
        );
    }
    // console.log("theme.palette.info", theme.palette.info);

    return (
        <Box display="flex" alignItems="center" justifyContent="center">
            <Button
                onClick={handleLike}
                variant="outlined"
                className={classesProf.likeButton}
                // className={classesProf.buttonSize + ' ' + classesProf.likeButton}
                color="primary"
                startIcon={<Favorite />}>
                {card.connected > 0 && card.connected < 3 ? 'Unmatch' : 'Like'}
            </Button>

            {card.connected === 2 ? (
                <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/messages"
                    className={classesProf.chatButton}
                    startIcon={<Chat />}>
                    Chat
                </Button>
            ) : (
                ''
            )}
        </Box>
    );
};

Buttons.propTypes = {
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    setSnackbar: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    match: state.match,
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    addLike,
    removeLike,
    setSnackbar,
})(Buttons);
