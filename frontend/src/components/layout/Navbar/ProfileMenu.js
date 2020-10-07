import React from 'react';
import { Badge, Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useStyles } from '../../../styles/custom';

const profileMenu = [
    {
        title: 'My profile',
        pageUrl: '/profile',
    },
    {
        title: 'Account Settings',
        pageUrl: '/settings',
    },
    {
        title: 'Visit history',
        pageUrl: '/profile',
    },
];

const ProfileMenu = ({ isMobile, user, profileSettings, setProfileSettings, handleNavigation }) => {
    const classes = useStyles();

    const handleClose = () => {
        setProfileSettings(null);
    };

    const handleClick = event => {
        setProfileSettings(event.currentTarget);
    };

    return (
        <>
            <IconButton className={classes.customIconButton} onClick={handleClick}>
                <Typography variant="button" className={isMobile ? classes.text : ''} color="textPrimary">
                    <Badge className={classes.pr}>
                        <AccountCircle />
                    </Badge>
                    {isMobile ? 'profile' : user.username}
                </Typography>
            </IconButton>
            <Menu
                className={classes.menu}
                keepMounted
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                elevation={0}
                anchorEl={profileSettings}
                open={Boolean(profileSettings)}
                onClose={handleClose}>
                {profileMenu.map(menuItem => (
                    <MenuItem
                        className={classes.menuItem}
                        key={menuItem.title}
                        onClick={() => handleNavigation(menuItem.pageUrl)}>
                        {menuItem.title}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ProfileMenu;
