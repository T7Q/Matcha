import { IconButton } from "@material-ui/core";
import { Favorite, Chat } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { addInteraction, removeLike } from "../../../actions/profile";

const ActionsDropdown = ({
    addInteraction,
    match,
    auth,
    card,
    location,
    profile,
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        console.log("handleClick", event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const handleLike = () => {
    //     if (auth.user.userHasPhotos > 0) {
    //         let toUserId = card.user_id;
    //         if (card.connected === 0)
    //             addLike(location, toUserId, match.match, profile.profile);
    //         else
    //             removeLike(location, toUserId, match.match, profile.profile);
    //     } else {
    //         alert("CAN'T LIKE, ADD at least 1 photo");
    //     }
    // };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreHorizIcon style={{ fill: "white" }} />
            </IconButton>
            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>UNMATCH</MenuItem>
                <MenuItem
                    onClick={() => {
                        addInteraction("report", profile.user_id);
                    }}
                >
                    REPORT
                </MenuItem>
                <MenuItem onClick={() => {
                        addInteraction("block", profile.user_id);
                    }}>BLOCK</MenuItem>
                <MenuItem onClick={handleClose}>x</MenuItem>
            </Menu>
        </div>
    );
};

ActionsDropdown.propTypes = {
    addInteraction: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    match: state.match,
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { addInteraction })(ActionsDropdown);
