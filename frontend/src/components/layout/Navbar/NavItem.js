import React, { useEffect } from 'react';
import { Badge, Typography, IconButton } from '@material-ui/core';
import { MessageOutlined, PeopleOutline, FavoriteBorder } from '@material-ui/icons';
import { navStyles } from '../../../styles/navStyles';

const NavItem = ({
    auth: { isAuthenticated, user, socket, loading },
    handleNavigation,
    notifications,
    getNotifications,
    updateNotifications,
    active,
    setActive,
}) => {
    const classes = navStyles();

    useEffect(() => {
        if (isAuthenticated) {
            socket.emit('LOGIN', user.userId);
            getNotifications();
            socket.on('READ_MESSAGES', async (senderId) => {
                // console.log('on read messsages in navbar');
                await updateNotifications('message', senderId);
                getNotifications();
            });
            socket.on('UPDATE_NOTIFICATIONS', (type) => {
                console.log('on update notifications in navbar', type);
                getNotifications();
            });
            return () => {
                socket.off('READ_MESSAGES');
                socket.emit('LOGOUT', user.userId);
            };
        }
    }, [isAuthenticated, getNotifications, socket, user.userId, updateNotifications]);

    const amount = (amount) => {
        return amount < 100 ? amount : '99+';
    };

    const menuItems = [
        {
            title: 'Matches',
            pageUrl: '/matches',
            icon: <PeopleOutline />,
            active: active === 'matches',
        },
        {
            title: 'Messages',
            pageUrl: '/messages',
            amount: amount(Number(notifications.message)),
            icon: <MessageOutlined />,
            color: 'primary',
            active: active === 'messages',
        },
        {
            title: 'Likes',
            pageUrl: '/likes',
            amount: amount(
                Number(notifications.like) +
                    Number(notifications.unlike) +
                    Number(notifications.match)
            ),
            icon: <FavoriteBorder />,
            color: 'primary',
            active: active === 'likes',
        },
    ];

    const handleClick = (url, title) => {
        setActive(title);
        handleNavigation(url);
    };

    return (
        <>
            {isAuthenticated &&
                user.status === 2 &&
                menuItems.map((menu) => (
                    <IconButton
                        key={menu.title}
                        className={menu.active ? classes.iconButtonActive : classes.iconButton}
                        onClick={() => handleClick(menu.pageUrl, menu.title)}>
                        <Typography
                            color="textSecondary"
                            className={classes.mobileText}
                            variant="button">
                            <Badge
                                badgeContent={menu.amount}
                                className={classes.pr}
                                color={menu.color}>
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
