import React, { useEffect } from 'react';
import { Badge, Typography, IconButton } from '@material-ui/core';
import { MessageOutlined, PeopleOutline, FavoriteBorder } from '@material-ui/icons';
import { useStyles } from '../../../styles/custom';

const NavItem = ({
    auth: { isAuthenticated, user, socket, loading },
    isMobile,
    handleNavigation,
    notifications,
    getNotifications,
    updateNotifications,
}) => {
    const classes = useStyles();

    useEffect(() => {
        if (isAuthenticated) {
            socket.emit('LOGIN', user.userId);
            getNotifications();
            socket.on('READ_MESSAGES', senderId => {
                console.log('on read messsages in navbar');
                updateNotifications('message', senderId);
                getNotifications();
            });
            socket.on('UPDATE_NOTIFICATIONS', () => {
                console.log('on update notifications in navbar');
                getNotifications();
            });
        }
    }, [isAuthenticated, getNotifications, socket, user.userId, updateNotifications]);

    const menuItems = [
        {
            title: 'Matches',
            pageUrl: '/matches',
            icon: <PeopleOutline />,
        },
        {
            title: 'Messages',
            pageUrl: '/messages',
            amount: Number(notifications.message),
            icon: <MessageOutlined />,
            color: 'primary',
        },
        {
            title: 'Likes',
            pageUrl: '/likes',
            amount: Number(notifications.like) + Number(notifications.unlike),
            icon: <FavoriteBorder />,
            color: notifications.unlike ? 'error' : 'primary',
        },
    ];

    return (
        <>
            {isAuthenticated &&
                user.status === 2 &&
                menuItems.map(menu => (
                    <IconButton
                        key={menu.title}
                        className={classes.customIconButton}
                        onClick={() => handleNavigation(menu.pageUrl)}>
                        <Typography
                            color="textSecondary"
                            className={isMobile ? classes.text : ''}
                            variant="button">
                            <Badge badgeContent={menu.amount} className={classes.pr} color={menu.color}>
                                {menu.icon}
                            </Badge>{' '}
                            {menu.title}
                        </Typography>
                    </IconButton>
                ))}
        </>
    );
};

export default NavItem;
