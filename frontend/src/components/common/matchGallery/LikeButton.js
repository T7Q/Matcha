import React from "react";
import { IconButton } from "@material-ui/core";
import { Favorite, Chat } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addInteraction } from "../../../actions/profile";

const LikeButton = ({ addInteraction, match, auth, card }) => {
    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            let toUserId = card.user_id;
            addInteraction("likes", toUserId, match.match);
        } else {
            alert("CAN'T LIKE, ADD at least 1 photo");
        }
    };

    return (
        <>
            {card.connected ? (
                <IconButton
                    aria-label="message"
                    component={Link}
                    to="/messages"
                >
                    <Chat />
                </IconButton>
            ) : (
                <IconButton aria-label="like" onClick={handleLike}>
                    <Favorite />
                </IconButton>
            )}
        </>
    );
};

LikeButton.propTypes = {
    addInteraction: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    addInteraction,
})(LikeButton);
