import { IconButton, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { addInteraction, unblockUser } from '../../../actions/profile';

import { useStyles } from '../../../styles/custom';
import { profileStyles } from '../../../styles/profileStyles';
import { useTheme } from '@material-ui/core/styles';

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
    const classes = useStyles();
    const classesProf = profileStyles();

    const menu = [
        {
            title: 'Report',
            handleClick: handleClickInteraction('reported'),
        },
        {
            title: blocked === '1' ? 'Unblock' : 'Block',
            handleClick: blocked === '1' ? handleClickUnblock : handleClickInteraction('blocked'),
        },
        {
            title: 'x',
            handleClick: handleClose,
        },
    ];

    return (
        <>
            <IconButton aria-haspopup="true" onClick={handleClick}>
                <MoreHorizIcon style={{ fill: 'white' }} fontSize="small" />
            </IconButton>
            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}>
                {menu.map(menuItem => (
                    <MenuItem className={classes.menuItem} key={menuItem.title} onClick={menuItem.handleClick}>
                        {menuItem.title}
                    </MenuItem>
                ))}
            </Menu>
        </>
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
