import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { addInteraction, unblockUser } from '../../../actions/profile';
import { componentStyles } from '../../../styles/componentStyles';
import { systemStyles } from '../../../styles/systemStyles';

const Dropdown = ({ chat, close }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { profile } = useSelector((state) => state.profile);
    const classes = componentStyles();
    const classesSystem = systemStyles();

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
        if (chat) {
            close(0);
            history.push('/messages');
        }
        dispatch(addInteraction(type, userId, chat));
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
                <MoreHorizIcon className={classesSystem.fillPrimary} fontSize="small" />
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
