import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { addInteraction, unblockUser } from '../../actions/profile';

const Dropdown = ({ addInteraction, unblockUser, profile: { profile } }) => {
    const userId = profile.user_id;
    const blocked = profile.blocked;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickUnblock = () => {
        unblockUser('profile', [{ user_id: userId }]);
    };
    const handleClickInteraction = type => () => {
        // unblockUser("profile", [{ user_id: userId }]);
        addInteraction(type, userId);
    };

    return (
        <div>
            <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreHorizIcon style={{ fill: 'white' }} />
            </IconButton>
            <Menu id="actions-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem style={{ color: 'blue' }} onClick={handleClickInteraction('reported')}>
                    REPORT
                </MenuItem>
                {blocked === '1' ? (
                    <MenuItem onClick={handleClickUnblock} style={{ color: 'blue' }}>
                        UNBLOCK
                    </MenuItem>
                ) : (
                    <MenuItem style={{ color: 'red' }} onClick={handleClickInteraction('blocked')}>
                        BLOCK
                    </MenuItem>
                )}

                <MenuItem onClick={handleClose} style={{ color: 'blue' }}>
                    x
                </MenuItem>
            </Menu>
        </div>
    );
};

Dropdown.propTypes = {
    addInteraction: PropTypes.func.isRequired,
    unblockUser: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
});

export default connect(mapStateToProps, {
    addInteraction,
    unblockUser,
})(Dropdown);
