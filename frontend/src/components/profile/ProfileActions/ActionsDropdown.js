import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { addInteraction } from "../../../actions/profile";
import { setSnackbar } from "../../../actions/setsnackbar";

const ActionsDropdown = ({ addInteraction, setSnackbar, userId }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // console.log("dropdown", userId);

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
                        addInteraction("report_users", userId, setSnackbar);
                    }}
                >
                    REPORT
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        addInteraction("block", userId);
                    }}
                >
                    BLOCK
                </MenuItem>
                <MenuItem onClick={handleClose}>x</MenuItem>
            </Menu>
        </div>
    );
};

ActionsDropdown.propTypes = {
    addInteraction: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { addInteraction, setSnackbar })(
    ActionsDropdown
);
