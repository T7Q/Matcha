import React, { useEffect } from 'react';
import { Badge, Typography, IconButton, MenuItem, Menu, Box } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useStyles } from '../../../styles/custom';

const ProfileMenu = ({
    isMobile,
    getNotifications,
    notifications,
    auth: { user, socket },
    profileSettings,
    setProfileSettings,
    handleNavigation,
}) => {
    const classes = useStyles();

    useEffect(() => {
        socket.on('UPDATE_NOTIFICATIONS', () => {
            console.log('here in profile menu');
            getNotifications();
        });
    }, [getNotifications, socket]);

    const handleClose = () => {
        setProfileSettings(null);
    };

    const handleClick = event => {
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
            pageUrl: '/visits/newvisits',
            notification: notifications.visit > 0 && notifications.visit,
            color: notifications.visit > 0 ? 'primary.main' : 'transparent',
        },
    ];

    return (
        <>
            <IconButton className={classes.customIconButton} onClick={handleClick}>
                <Typography variant="button" className={isMobile ? classes.text : ''} color="textPrimary">
                    <Badge className={classes.pr} badgeContent={notifications.visit} color="primary">
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
