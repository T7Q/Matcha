import React from 'react';
import { IconButton } from '@material-ui/core';
import { FavoriteOutlined, Chat } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addLike, removeLike } from '../../../actions/profile';
import { setSnackbar } from '../../../actions/setsnackbar';
import { galleryStyles } from '../../../styles/galleryStyles';

const LikeButton = ({ addLike, removeLike, setSnackbar, match, auth, card, profile }) => {
    const classesGallery = galleryStyles();
    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            let toUserId = card.user_id;
            // console.log('card conn', card.connected);
            if (card.connected === 0 || card.connected === 3) {
                if (card.connected === 3) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'match');
                } else {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'like');
                }
                addLike('userCard', toUserId, match.match, profile.profile);
            } else {
                if (card.connected === 2) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'unlike');
                }
                removeLike('userCard', toUserId, match.match, profile.profile);
            }
        } else {
            setSnackbar(true, 'error', 'Add at least 1 photo to enable like functionality');
        }
    };

    // let color = card.connected > 0 ? { fill: theme.palette.primary.main } : { fill: theme.palette.text.primary };

    return (
        <>
            <IconButton aria-label="like" onClick={handleLike} className={classesGallery.icon}>
                <FavoriteOutlined
                    fontSize="large"
                    className={
                        card.connected > 0 && card.connected < 3
                            ? classesGallery.fullLikeBtn
                            : classesGallery.emptyLikeBtn
                    }
                />
            </IconButton>
            {card.connected === 2 ? (
                <IconButton className={classesGallery.icon} aria-label="chat" component={Link} to="/messages">
                    <Chat
                        fontSize="large"
                        className={classesGallery.fullChatBtn}
                        // style={{ fill: theme.palette.text.primary }}
                    />
                </IconButton>
            ) : (
                ''
            )}
        </>
    );
};

LikeButton.propTypes = {
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
})(LikeButton);
