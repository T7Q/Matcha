import React from "react";
import { IconButton } from "@material-ui/core";
import { Favorite, Chat } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addLike, removeLike } from "../../../actions/profile";
import { setSnackbar } from "../../../actions/setsnackbar";

const LikeButton = ({
    addLike,
    removeLike,
    setSnackbar,
    match,
    auth,
    card,
    profile,
}) => {
    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            color = card.connected > 0 ? { fill: "red" } : { fill: "white" };
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

    let color = card.connected > 0 ? { fill: "red" } : { fill: "white" };

    return (
        <>
            <IconButton aria-label="like" onClick={handleLike}>
                <Favorite style={color} />
            </IconButton>
            {card.connected === 2 ? (
                <IconButton aria-label="chat" component={Link} to="/messages">
                    <Chat style={{ fill: "blue" }} />
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
