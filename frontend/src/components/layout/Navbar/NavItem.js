import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Badge, Typography, IconButton } from '@material-ui/core';
import { MessageOutlined, PeopleOutline, FavoriteBorder } from '@material-ui/icons';

import { getNotifications, updateNotifications } from '../../../actions/notifications';
import { btnStyles } from '../../../styles/btnStyles';
import { systemStyles } from '../../../styles/systemStyles';

const NavItem = ({ handleNavigation, active, setActive }) => {
    const { isAuthenticated, user, socket } = useSelector((state) => state.auth);
    const notifications = useSelector((state) => state.notifications);
    const dispatch = useDispatch();
    const classes = btnStyles();
    const classesSystem = systemStyles();

    useEffect(() => {
        if (isAuthenticated) {
            socket.emit('LOGIN', user.userId);
            // console.log('nav item use eff');
            dispatch(getNotifications());
            socket.on('READ_MESSAGES', async (senderId) => {
                await dispatch(updateNotifications('message', senderId));
                // console.log('nav item use eff in socket readmessages');
                dispatch(getNotifications());
            });
            socket.on('UPDATE_NOTIFICATIONS', (type) => {
                // console.log('nav item use eff in socket update notification');
                // console.log('on update notifications in navbar', type);
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
                            className={classesSystem.mobileText}
                            variant="button">
                            <Badge
                                badgeContent={menu.amount}
                                className={classesSystem.pr5}
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
