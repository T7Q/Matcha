import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Typography, IconButton } from '@material-ui/core';
import { MessageOutlined, PeopleOutline, FavoriteBorder } from '@material-ui/icons';

import { getNotifications, updateNotifications } from '../../../actions/notifications';
import { navStyles } from '../../../styles/navStyles';

const NavItem = ({ handleNavigation, active, setActive }) => {
    const { isAuthenticated, user, socket } = useSelector((state) => state.auth);
    const notifications = useSelector((state) => state.notifications);
    const dispatch = useDispatch();
    const classes = navStyles();

    useEffect(() => {
        if (isAuthenticated) {
            socket.emit('LOGIN', user.userId);
            dispatch(getNotifications());
            socket.on('READ_MESSAGES', async (senderId) => {
                await dispatch(updateNotifications('message', senderId));
                dispatch(getNotifications());
            });
            socket.on('UPDATE_NOTIFICATIONS', (type) => {
                console.log('on update notifications in navbar', type);
                dispatch(getNotifications());
            });
            return () => {
                socket.off('READ_MESSAGES');
                socket.emit('LOGOUT', user.userId);
            };
        }
    }, [isAuthenticated, socket, user.userId, dispatch]);

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
            amount: Number(notifications.message),
            icon: <MessageOutlined />,
            color: 'primary',
            active: active === 'messages',
        },
        {
            title: 'Likes',
            pageUrl: '/likes',
            amount:
                Number(notifications.like) +
                Number(notifications.unlike) +
                Number(notifications.match),
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
                                max={99}
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
