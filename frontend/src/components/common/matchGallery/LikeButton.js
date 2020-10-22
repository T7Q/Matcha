import React from "react";
import { IconButton } from "@material-ui/core";
import { FavoriteOutlined, Chat } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addLike, removeLike } from "../../../actions/profile";
import { setSnackbar } from "../../../actions/setsnackbar";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "../../../styles/custom";
import { galleryStyles } from "../../../styles/galleryStyles";

const LikeButton = ({
    addLike,
    removeLike,
    setSnackbar,
    match,
    auth,
    card,
    profile,
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const classesGallery = galleryStyles();
    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            // color = card.connected > 0 ? { fill: theme.palette.primary.main } : { fill: theme.palette.text.primary };
            let toUserId = card.user_id;
            if (card.connected === 0)
                addLike("userCard", toUserId, match.match, profile.profile);
            else removeLike("userCard", toUserId, match.match, profile.profile);
        } else {
            setSnackbar(
                true,
                "error",
                "Add at least 1 photo to enable like functionality"
            );
        }
    };

    // let color = card.connected > 0 ? { fill: theme.palette.primary.main } : { fill: theme.palette.text.primary };

    return (
        <>
            <IconButton
                aria-label="like"
                onClick={handleLike}
                className={classesGallery.icon}
            >
                <FavoriteOutlined
                    fontSize="large"
                    className={
                        card.connected > 0
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
                    to="/messages"
                >
                    <Chat
                        fontSize="large"
                        style={{ fill: theme.palette.text.primary }}
                    />
                </IconButton>
            ) : (
                ""
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

const mapStateToProps = (state) => ({
    match: state.match,
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, {
    addLike,
    removeLike,
    setSnackbar,
})(LikeButton);
