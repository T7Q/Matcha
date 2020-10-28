import React, { useEffect } from 'react';
import { Badge, Typography, IconButton, MenuItem, Menu, Box } from '@material-ui/core';
import { navStyles } from '../../../styles/navStyles';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const ProfileMenu = ({
    getNotifications,
    notifications,
    auth: { user, socket },
    profileSettings,
    setProfileSettings,
    handleNavigation,
    active,
    setActive,
}) => {
    const classes = navStyles();

    useEffect(() => {
        socket.on('UPDATE_NOTIFICATIONS', (type) => {
            getNotifications();
        });
    }, [getNotifications, socket]);

    const handleClose = () => {
        setProfileSettings(null);
    };

    const amount = (amount) => {
        return amount < 100 ? amount : '99+';
    };

    const handleClick = (event) => {
        setProfileSettings(event.currentTarget);
    };

    const profileMenu = [
        {
            title: 'My profile',
            pageUrl: '/profile/me',
        },
        {
            title: 'Account Settings',
            pageUrl: '/settings',
        },
        {
            title: 'Visit history',
            pageUrl: '/visits/allvisits',
            notification: notifications.visit ? amount(notifications.visit) : '',
            color: notifications.visit > 0 ? 'primary.main' : 'transparent',
        },
    ];

    return (
        <>
            <IconButton
                className={
                    active === 'profile' || active === 'settings' || active === 'visits'
                        ? classes.iconButtonActive
                        : classes.iconButton
                }
                onClick={handleClick}>
                <Typography variant="button" className={classes.mobileText} color="textPrimary">
                    <Badge
                        className={classes.pr}
                        badgeContent={amount(notifications.visit)}
                        color="primary">
                        <PersonOutlineIcon />
                        {/* <Avatar
              style={{
                width: '25px',
                height: '25px',
                // backgroundColor: active === 'Profile' ? '#ca416e' : 'primary',
              }}>
              {user.username.charAt(0)}
            </Avatar> */}
                    </Badge>
                    Profile
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
                {profileMenu.map((menuItem) => (
                    <MenuItem
                        className={classes.menuItem}
                        key={menuItem.title}
                        onClick={() => {
                            setActive('Profile');
                            handleNavigation(menuItem.pageUrl);
                        }}>
                        {menuItem.title}
                        <Box
                            ml={2}
                            borderRadius="50%"
                            width="20px"
                            height="20px"
                            textAlign="center"
                            bgcolor={menuItem.color}>
                            {menuItem.notification}
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ProfileMenu;
