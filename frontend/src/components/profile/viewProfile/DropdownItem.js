import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { addInteraction, unblockUser } from '../../../actions/profile';
import { navStyles } from '../../../styles/navStyles';

const Dropdown = () => {
    const dispatch = useDispatch();
    const { profile } = useSelector((state) => state.profile);
    const classes = navStyles();

    const userId = profile.user_id;
    const blocked = profile.blocked;
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickUnblock = () => {
        dispatch(unblockUser('profile', [{ user_id: userId }]));
    };

    const handleClickInteraction = (type) => () => {
        dispatch(addInteraction(type, userId));
    };

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
                <MoreHorizIcon className={classes.fillWhite} fontSize="small" />
            </IconButton>
            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.menu}>
                {menu.map((menuItem) => (
                    <MenuItem
                        className={classes.menuItem}
                        key={menuItem.title}
                        onClick={menuItem.handleClick}>
                        {menuItem.title}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default Dropdown;
