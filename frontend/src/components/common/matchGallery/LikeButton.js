import React from "react";
import { IconButton } from "@material-ui/core";
import { Favorite, Chat } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addLike, removeLike } from "../../../actions/profile";

const LikeButton = ({ addLike, removeLike, match, auth, card }) => {
    const handleLike = () => {
        if (auth.user.userHasPhotos > 0) {
            let toUserId = card.user_id;
            if (card.connected === 0)
                addLike("likes", toUserId, match.match);
            // else if (card.connected === 1 || card.connected === 2 )
            else
                removeLike("likes", toUserId, match.match);
        } else {
            alert("CAN'T LIKE, ADD at least 1 photo");
        }
    };
    return (
        <>
            <IconButton aria-label="like" onClick={handleLike}>
                <Favorite />
            </IconButton>
            {(card.connected === 1 || card.connected === 2 )? (
                <IconButton aria-label="chat" component={Link} to="/messages">
                    + 
                </IconButton>
            ) : (
                ""
            )}
            {card.connected === 2 ? (
                <IconButton aria-label="chat" component={Link} to="/messages">
                    <Chat />
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
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    addLike, removeLike
})(LikeButton);
