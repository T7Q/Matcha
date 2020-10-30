import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@material-ui/core';
import { FavoriteBorderRounded } from '@material-ui/icons';
import { ChatBubbleOutlineRounded } from '@material-ui/icons';

import { Link } from 'react-router-dom';
import { addLike, removeLike } from '../../../actions/profile';
import { setSnackbar } from '../../../actions/setsnackbar';
import { galleryStyles } from '../../../styles/galleryStyles';

const LikeButton = ({ card }) => {
    const dispatch = useDispatch();

    const match = useSelector((state) => state.match);
    const auth = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.profile);

    const classesGallery = galleryStyles();
    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            let toUserId = card.user_id;
            if (card.connected === 0 || card.connected === 3) {
                if (card.connected === 3) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'match');
                } else {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'like');
                }
                dispatch(addLike('userCard', toUserId, match.match, profile.profile));
            } else {
                if (card.connected === 2) {
                    auth.socket.emit('UPDATE_NOTIFICATIONS', toUserId, 'unlike');
                }
                dispatch(removeLike('userCard', toUserId, match.match, profile.profile));
            }
        } else {
            dispatch(
                setSnackbar(true, 'error', 'Add at least 1 photo to enable like functionality')
            );
        }
    };

    return (
        <>
            <IconButton aria-label="like" onClick={handleLike} className={classesGallery.icon}>
                <FavoriteBorderRounded
                    className={
                        card.connected > 0 && card.connected < 3
                            ? classesGallery.fullLikeBtn
                            : classesGallery.emptyLikeBtn
                    }
                />
            </IconButton>
            {card.connected === 2 ? (
                <IconButton
                    className={classesGallery.icon}
                    aria-label="chat"
                    component={Link}
                    to={`/messages/${card.user_id}`}>
                    <ChatBubbleOutlineRounded className={classesGallery.fullChatBtn} />
                </IconButton>
            ) : (
                ''
            )}
        </>
    );
};

export default LikeButton;
